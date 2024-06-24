'use client'
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
  } from "@/components/ui/pagination"
import { useEffect, useState } from "react"
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";

  interface IPagination {
    setPage: React.Dispatch<React.SetStateAction<number>>
    productQty: number
    page: number
  }
  
  export function PaginationTemplate({setPage, productQty, page}:IPagination) {
    const [pageArr, setPageArr] = useState<number[]>([])

    useEffect(() => {
      const pageLimit = productQty % 10 === 0 ? productQty/10 : Math.floor(productQty/10) + 1
      let arr = []
      for (let i=1; i<=pageLimit; i++) {
        arr.push(i)
      }
      setPageArr(arr)
    }, [productQty])
    console.log(pageArr);
    


    return (
      <Pagination>
          <PaginationContent className="gap-0">
            <PaginationItem>
              <PaginationLink href={`#${page}`}  className={page - 2 <= 0  || page !== pageArr.length ? "hidden" : 'mr-1'} onClick={() => setPage(page - 2)}>{page - 2}</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href={`#${page}`} className={page - 1 == 0 ? "hidden" : 'mr-1'} onClick={() => setPage(page -1 )}>{page - 1}</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href={`#${page}`} isActive={true} onClick={() => setPage(page)}>{page}</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href={`#${page}`}  className={page + 1 > pageArr.length ? "hidden" : 'ml-1'} onClick={() => setPage(page + 1)}>{page + 1}</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href={`#${page}`}  className={page + 2 >= pageArr.length  || page - 1 !== 0  ? "hidden" : 'ml-1'} onClick={() => setPage(page + 2)}>{page + 2}</PaginationLink>
            </PaginationItem>
          </PaginationContent>
      </Pagination>
    )
  }
  