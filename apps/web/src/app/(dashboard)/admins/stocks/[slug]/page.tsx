'use client'
import { WarehouseDropdown } from "@/app/(dashboard)/_components/warehouseDropdown";
import { getProductSlug, getStockDetail, getWarehouse } from "@/app/action";
import { IProduct, IStockMutationItem, IWarehouse } from "@/constants";
import { getAdminClientSide } from "@/lib/utils";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { DateRange } from "react-day-picker";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PiArrowSquareOut, PiCaretCircleLeft, PiFileArrowDownFill, PiMagnifyingGlass } from "react-icons/pi";
import { DatePickerWithRange } from "../_components/datePicker";
import { Input } from "@/components/ui/input";
import { StockDetailTable } from "../_components/stockDetailTable";
import { Selector } from "../../products/_components/manageProductModal/selector";
import Image from "next/image";

import { Table,TableBody,TableCell, TableHead,TableHeader, TableRow} from "@/components/ui/table"
import { Separator } from "@/components/ui/separator";

const monthFirstDate = () => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  }

export default function Page() {
    const {slug} = useParams()
    const typeArr = ['Select All','Restock', 'Remove', 'Transfer', 'Inbound', 'Delete', 'Transaction']
    const [selectedWH, setSelectedWH] = useState('All Warehouses')
    const [warehouseList, setWarehouseList] = useState<IWarehouse[]>([])
    const [StockList, setStockList] = useState<IStockMutationItem[]>([])
    const [productData, setProductData] = useState<IProduct>()
    const [productQty, setProductQty] = useState(0)
    const [type, setType] = useState('Select All');
    const [page, setPage] = useState(1)
    const [isSuper, setIsSuper] = useState(false)
    const [date, setDate] = useState<DateRange | undefined>({
      from: monthFirstDate(),
      to: new Date(),
    })
  
    const getAdmWH = async() => {
      const admin = await getAdminClientSide()
      const warehouse = await getWarehouse(admin.id)
      setWarehouseList(warehouse)
      if (admin.role == 'warAdm') {
        setSelectedWH(warehouse[0].warehouseName)
      } else if (admin.role == 'superAdm') {
        setIsSuper(true)
      }
    }
  
    const getData = async() => {
      if (date && selectedWH) {
        const warehouse = selectedWH == 'All Warehouses'? '' : selectedWH
        const t = type == 'Select All' ? '' : type 
        const res = await getStockDetail(String(slug), warehouse, t, page, 10, date)
        const prod = await getProductSlug(String(slug), warehouse, '')
        if (res.status == 'ok' && prod.status == 'ok') {
            setStockList(res.stockList)
            setProductQty(res.totalData)
            setProductData(prod.productList)
        }
      }
    }
  
    useEffect(() => {
      getAdmWH()
    }, [])
  
    useEffect(() => {
      getData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedWH, type, page, date])
    
    return (
      <div className="flex flex-col w-full min-h-screen py-10 px-10 md:px-20">  
        <div className='flex w-full mb-7 items-center max-sm:flex-col gap-y-7'>
            <div className='w-full flex items-center gap-0'>
            <Button variant={'ghost'} className='w-5 max-sm:h-5 sm:w-10 p-0'>
                <Link href={'/admins/stocks/'} >
                <PiCaretCircleLeft className='text-xs sm:text-3xl'/>
                </Link>
            </Button>
            <h1 className='text-xl sm:text-4xl font-medium'>Product Stock Details</h1>
            </div>
            <div className='flex flex-col w-full items-end mb-7'>
                <p className='text-xl'>Warehouse</p>
                <WarehouseDropdown 
                    selectedWH={selectedWH}
                    setSelectedWH={setSelectedWH}
                    warehouseList={warehouseList}
                    isSuper={isSuper}
                />
            </div>
        </div>

        <div className="flex items-center justify-evenly border-[1px] gap-y-5 shadow-md rounded-lg p-5 flex-wrap mb-10">
          <div className="flex items-center gap-4">
            <Image
              width={168}
              height={168}
              className={`rounded-md border-[1px] border-gray-200 w-[168px] h-[168px] object-cover object-center`}
              alt={'main image'}
              src={productData ? productData.thumbnailURL :'/images/emptyimage.png'}
            />
            <div>
              <p className="text-lg font-medium underline">{productData?.name}</p>
              <p className="text-sm text-gray-400">{(productData?.category.gender)?.toLowerCase()} | {(productData?.category.type)?.toLowerCase()} | {productData?.category.category}</p>
            </div>
          </div>

          <div className="">
            {
              <Table className="text-xs">
              <TableHeader>
                  {productData?.oneSize ?
                    <TableRow>
                      <TableHead className="text-center">Variant</TableHead>
                        <TableHead className="text-center">One Size</TableHead>
                    </TableRow>
                      :
                      <TableRow>
                        <TableHead className="text-center">Variant</TableHead>
                        <TableHead className="text-center">XL</TableHead>
                        <TableHead className="text-center">L</TableHead>
                        <TableHead className="text-center">M</TableHead>
                        <TableHead className="text-center">S</TableHead>
                      </TableRow>
                  }
              </TableHeader>
              <TableBody>
                {productData ? 
                productData.variants.map((item, index) => {
                  return (  
                  <TableRow key={item.id}>
                    <TableCell className="text-center font-semibold">{item.color}</TableCell>
                    <TableCell className={`text-center ${productData.oneSize? 'hidden': ''}`}>{item.warehouseProduct.filter(product => product.size === 'XL').reduce((total, product) => total + product.stock, 0)}</TableCell>
                    <TableCell className={`text-center ${productData.oneSize? 'hidden': ''}`}>{item.warehouseProduct.filter(product => product.size === 'L').reduce((total, product) => total + product.stock, 0)}</TableCell>
                    <TableCell className={`text-center ${productData.oneSize? 'hidden': ''}`}>{item.warehouseProduct.filter(product => product.size === 'M').reduce((total, product) => total + product.stock, 0)}</TableCell>
                    <TableCell className={`text-center ${productData.oneSize? 'hidden': ''}`}>{item.warehouseProduct.filter(product => product.size === 'S').reduce((total, product) => total + product.stock, 0)}</TableCell>
                    <TableCell className={`text-center ${productData.oneSize? '': 'hidden'}`}>{item.warehouseProduct.filter(product => product.size === 'ONESIZE').reduce((total, product) => total + product.stock, 0)}</TableCell>
                  </TableRow>
                  )
                })
                :
                <TableRow>
                  <TableCell className="font-medium text-center" colSpan={7} >Data will appear here.</TableCell>
                </TableRow>
              } 
              </TableBody>
            </Table>
            }
          </div>
        </div>
  
        <div>
  
          <div className='flex items-center flex-wrap gap-y-10 justify-between'>
  
            <div className='flex gap-2 flex-1 w-full max-sm:justify-between items-center'>
              <div className='flex items-center justify-end gap-2 w-full'>
                <label htmlFor="search" className='max-sm:hidden'><PiMagnifyingGlass className='text-2xl'/></label>
                <Input id='search' type="text" placeholder="Search products" className='w-full sm:max-w-60 min-w-44'/>
              </div>

              <DatePickerWithRange date={date} setDate={setDate}/>
              <Selector 
              label="Filter Type"
              setState={setType}
              state={typeArr}
              defValue={type}
              width="w-52"
              />

              <PiFileArrowDownFill className='text-5xl'/>
            </div>
          </div>
  
          <StockDetailTable
            StockList={StockList}
            page={page}
            productQty={productQty}
            setPage={setPage}
            isSuper={isSuper}
          />
        </div>   
      </div>
    )
  
}