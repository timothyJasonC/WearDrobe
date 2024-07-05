'use client'
import { Input } from "@/components/ui/input"
import { PiArrowUpRight, PiPencilBold, PiPlusBold, PiWarehouse } from "react-icons/pi"
import { LoadingButton } from "@/components/ui/loading-button"
import { useEffect, useRef, useState } from "react"
import { toast } from "sonner"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import AddressInputs from "@/components/order/AddressInput"
import { Address, City, Province } from "@/constants"
import { getCities, getProvinces } from "@/lib/cart"
import { getRequest, postRequest } from "@/lib/fetchRequests"
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { IAdmin } from "../../admins/_components/columns"

export function DialogWarehouse({ btnText, editWarehouse, editDialog, setEditDialog, optionalCancleFunc, warehouseProvince, warehouseCity, warehouseAddress, WarehouseName, assignedWarehouseAdmin }
: { btnText: string, editWarehouse: boolean, editDialog?: any, setEditDialog?:any, optionalCancleFunc?: any, warehouseProvince?: string, warehouseCity?: string, warehouseAddress?: string, WarehouseName?: string, assignedWarehouseAdmin?: string }) {
    const [ isLoading, setIsLoading ] = useState(false);

    const [provinces, setProvinces] = useState<Province[]>([]);
    const [cities, setCities] = useState<City[]>([]);
    const [selectedProvince, setSelectedProvince] = useState<string>('');
    const [selectedCity, setSelectedCity] = useState<string>('');
    const [address, setAddress] = useState<string>('');
    const [addressList, setAddressList] = useState<Address[]>([]);
    const [ labelAddress, setLabelAddress ] = useState('');
    const [ openDialog, setOpenDialog ] = useState(false);
    const [ warehouseNameCheck, setWarehouseNameCheck ] = useState(true);
    const [ assignedAdmin, setAssignedAdmin ] = useState('')
    const [ availableAdmins, setAvailableAdmins ] = useState([])
    
    const warehouseNameRef = useRef(null)

    const fetchProvinces = async () => {
        try {
            const data = await getProvinces();
            setProvinces(data.rajaongkir.results);
        } catch (err) {
            console.log(err);
        }
    };

    const removeAddress = () => {
        setSelectedProvince('');
        setSelectedCity('');
        setAddress('');
    };

    const fetchCities = async (provinceId: string) => {
        const data = await getCities(provinceId);
        setCities(data.rajaongkir.results);
    };

    function findMeGeoLocation() {
        function successCallback(position: any) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            let href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
        }

        function errorCallback(error: any) {
            console.log(error)
        }

        navigator.geolocation.getCurrentPosition(successCallback, errorCallback, {
            enableHighAccuracy: true,
            timeout: 5000
        })
    }

    async function fetchAvailableAdmins(){
        try {
            const res = await getRequest('/admin/availableAdmins')
            const data = await res.json()
            if (res.ok) {
                setAvailableAdmins(data.data)
            }
        } catch (error) {
            toast.error('Failed fetching available admins')
        }
    }

    useEffect(() => {
        findMeGeoLocation()
        fetchProvinces();
        fetchAvailableAdmins()
    }, []);

    useEffect(() => {
        if (editWarehouse) {
            if (warehouseProvince) {
                setSelectedProvince(warehouseProvince)
            }
        }
    }, [ provinces ])

    useEffect(() => {
        if (editWarehouse) {
            // setSelectedCity(fetchedAddress.city_id)
            // setAddress(fetchedAddress.address)
        }
    }, [ cities ])

    useEffect(() => {
        if (selectedProvince) {
            fetchCities(selectedProvince);
        }
    }, [selectedProvince]);

    async function handleCreateWarehouse() {
        setIsLoading(true)
        try {
            if (warehouseNameRef.current) {
                const warehouseNameValue = (warehouseNameRef.current as HTMLInputElement)?.value
                const res = await postRequest({ selectedCity, address, warehouseName: warehouseNameValue, assignedAdmin: assignedAdmin == 'null' ? '' : assignedAdmin }, '/warehouses/')
                const data = await res.json();
                if (res.ok) {
                    toast.success(data.message)
                    setOpenDialog(false)
                } else {
                    toast.error(data.message)
                }
            }
        } catch (error) {
            if (error instanceof Error) toast.error(error.message)
        }
        setIsLoading(false)
    }

    async function handleEditWarehouse() {

    }

    const handleWarehouseNameChange = () => {
        if (warehouseNameRef.current){
            if ((warehouseNameRef.current as HTMLInputElement).value.trim().length > 6) {
                setWarehouseNameCheck(false)
            } else return setWarehouseNameCheck(true);
        }
    }

    function handleAdminChange(value: string) {
        if (value) {
            setAssignedAdmin(value)
        } 
    }

    return (
        <AlertDialog open={ editWarehouse? editDialog : openDialog } onOpenChange={ editWarehouse ? setEditDialog : setOpenDialog}>
            <AlertDialogTrigger asChild>
                <LoadingButton variant="outline" className={`flex gap-2 ${editWarehouse ? 'hidden' : ''}`}><PiPlusBold />Create New Warehouse</LoadingButton>
            </AlertDialogTrigger>
            <AlertDialogContent className="sm:max-w-[40rem] md:max-w-[50rem] lg:max-w-[70rem] overflow-scroll">
                <AlertDialogHeader>
                    <AlertDialogTitle className="flex gap-2 items-center"><PiWarehouse size={`1.2rem`} />Create New Warehouse</AlertDialogTitle>
                    <AlertDialogDescription>
                        Fill in the data to create a new warehouse.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <div className="flex flex-col lg:flex-row-reverse justify-end gap-4">
                    <div className="w-full lg:w-[60%] flex flex-col gap-2 lg:gap-4">
                        {/* warehouse name */}
                        <div className="flex flex-col gap-1">
                            <Label>Warehouse Name</Label>
                            <Input
                                ref={warehouseNameRef}
                                onChange={handleWarehouseNameChange}
                                className="w-full"
                                placeholder="@example: Warehouse Jaya Abadi"
                                type="text"
                            />
                        </div>

                        {/* assign admin */}
                        <div className="flex flex-col gap-1">
                            <Label>Assign Admin</Label>
                            <Select onValueChange={handleAdminChange}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select available admin" />
                                </SelectTrigger>
                                <SelectContent>
                                    { availableAdmins.length > 0 ?
                                        availableAdmins.map((admin: IAdmin) => {
                                            return <SelectItem key={ admin.id } value={ admin.id }>{ admin.fullName }</SelectItem>
                                        })
                                        :
                                        <SelectItem value="null">Admin not available</SelectItem>
                                    }
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    {/* warehouse address */}
                    <AddressInputs
                        cities={cities}
                        provinces={provinces}
                        selectedCity={selectedCity}
                        selectedProvince={selectedProvince}
                        setSelectedCity={setSelectedCity}
                        setSelectedProvince={setSelectedProvince}
                        address={address}
                        setAddress={setAddress}
                        fetchCities={fetchCities}
                        forWarehouse={true}
                    />
                </div>
                <AlertDialogFooter className={`${!address || !selectedCity ? 'cursor-not-allowed' : ''}`}>
                    <AlertDialogCancel onClick={optionalCancleFunc}>
                        Cancel
                    </AlertDialogCancel>
                    <div className="flex justify-end">
                        <LoadingButton 
                            disabled={
                                !address || 
                                !selectedCity || warehouseNameCheck || isLoading
                            }
                            onClick={editWarehouse ? handleEditWarehouse : handleCreateWarehouse}
                            loading={isLoading} className="px-10 flex gap-2 max-sm:w-full sm:w-fit" type="submit"
                        >
                                
                                {btnText}
                            <PiArrowUpRight />
                        </LoadingButton>
                    </div>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
