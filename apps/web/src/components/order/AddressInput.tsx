import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { City, Province } from "@/constants";
import { Label } from "../ui/label";
import Map from "../Map";
import { useEffect, useState } from "react";
import { bandungSubDistricts } from "@/lib/utils";
import { getRequest } from "@/lib/fetchRequests";
import { toast } from "sonner";
import { IWarehouse } from "@/app/(dashboard)/admins/warehouses/_components/columns";
import { PiSmileySad } from "react-icons/pi";

type AddressProps = {
  selectedProvince: string;
  setSelectedProvince: (value: string) => void;
  provinces: Province[];
  selectedCity: string;
  setSelectedCity: (value: string) => void;
  cities: City[];
  address: string;
  setAddress: (value: string) => void;
  fetchCities: (provinceId: string) => Promise<void>;
  labelAddress?: string;
  setLabelAddress?:(value: string) => void;
  id?: string
  forWarehouse: boolean
  warehouseData?: IWarehouse
  defaultCity?: string
  setDefaultCity?:(value: string) => void;
}

export default function AddressInputs({ selectedProvince, setSelectedProvince, provinces, setSelectedCity, cities, selectedCity, address, setAddress, fetchCities, labelAddress, setLabelAddress, id, forWarehouse, warehouseData, defaultCity, setDefaultCity }: AddressProps) {

    const [ currentProvince, setCurrentProvince ] = useState('');
    const [ currentCity, setCurrentCity ] = useState('');
    const [ currentSubDistrict, setCurrentSubDistrict ] = useState<any>();
    const [ currentWard, setCurrentWard ] = useState<any>();
    const [ currentNeighbor, setCurrentNeighbor ] = useState<any>();
    const [ currentAddress, setCurrentAddress ] = useState<any>();
    const [ currentRoad, setCurrentRoad ] = useState<any>();
    const [ lngLat, setLngLat ] = useState([])
    const [ defaultAddress, setDefaultAddress ] = useState<string>();

    async function getEditingProvince() {
        try {
            const res = await getRequest(`address/${id}`)
            const data = await res.json()
            const fetchedAddress = data.data;
            if (fetchedAddress) {
                setSelectedProvince(fetchedAddress.province_id)
                if (setLabelAddress) setLabelAddress(fetchedAddress.labelAddress)
            }
        } catch (error) {
            toast.error('Something went wrong while fetching your address data')
        }
    }

    async function getEditingCity() {
        try {
            const res = await getRequest(`address/${id}`)
            const data = await res.json()
            const fetchedAddress = data.data;
            if (fetchedAddress) {
                if (!currentCity) {
                    setSelectedCity(fetchedAddress.city_id)
                    setDefaultAddress(fetchedAddress.address)
                }
            }
        } catch (error) {
            toast.error('Something went wrong while fetching your address data')
        }
    }

    useEffect(() => {
        if (id) getEditingProvince()
        if (warehouseData) setSelectedProvince(warehouseData.province_id);
    }, [ id ])
    
    useEffect(() => {
        if (currentProvince) {
            if (provinces) {
                const selected = provinces.filter(prov => prov.province == currentProvince)[0]
                if (selected) setSelectedProvince(selected.province_id)
            }
        }
    }, [ currentProvince ])

    useEffect(() => {
        if (selectedProvince) fetchCities(selectedProvince);
    }, [ selectedProvince ])

    useEffect(() => {
        if (defaultCity) setCurrentCity(defaultCity)
    }, [ ])

    useEffect(() => {
        if (cities) {
            if (id) getEditingCity();
            const selected = cities.filter(city => city.city_name == currentCity)[0]
            if (currentSubDistrict?.text) {
                setSelectedCity(bandungSubDistricts.includes(currentSubDistrict.text) ? '23' : selected?.city_id);
            } else setSelectedCity(selected?.city_id);
                        
            const newAddress = currentAddress || currentRoad?.text || currentNeighbor?.text || currentWard?.text || currentSubDistrict?.text || "";
            setDefaultAddress(newAddress)
            setAddress(newAddress);
            setCurrentProvince('')
        }
    }, [ cities, lngLat ])

    return (
        <section className={`flex flex-col gap-2 lg:gap-4 ${ forWarehouse ? 'w-full' : '' }`}>
            <Map 
                setCurrentRoad={setCurrentRoad}
                setCurrentAddress={setCurrentAddress}
                setCurrentWard={setCurrentWard} setCurrentNeighbor={setCurrentNeighbor}
                setCurrentSubDistrict={setCurrentSubDistrict} setCurrentCity={setCurrentCity} 
                setLngLat={setLngLat} setCurrentProvince={setCurrentProvince} 
            />
            { !forWarehouse &&
                <div className="flex items-center justify-between max-sm:flex-col max-sm:items-start max-sm:gap-1">
                    <Label className='text-black'>Label</Label>
                    <Input className={`max-w-full ${ forWarehouse ? 'sm:max-w-96 md:max-w-[35rem] lg:max-w-96' : 'sm:max-w-80' } duration-200`} value={labelAddress} onChange={(e) => {if (setLabelAddress) setLabelAddress(e.target.value)}} placeholder="@example: Rumah Menteng" required />
                </div>
            }
            <div className="flex items-center justify-between max-sm:flex-col max-sm:items-start max-sm:gap-1">
                <Label className='text-black'>Province</Label>
                <Select onValueChange={setSelectedProvince} value={selectedProvince}> 
                    <SelectTrigger className={`max-w-full ${ forWarehouse ? 'sm:max-w-96 md:max-w-[35rem] lg:max-w-96' : 'sm:max-w-80' } duration-200`}>
                        <SelectValue placeholder={ !provinces ? 'Cannot fetch provinces' : 'Select Province' } />
                    </SelectTrigger>
                    <SelectContent>
                        { provinces ?
                        provinces.map((province: Province) => (
                            <SelectItem key={province.province_id} value={province.province_id}>
                                {province.province}
                            </SelectItem>
                        ))
                        :
                            <SelectItem value={'-1'}>
                                <div className="flex items-center gap-2">
                                    <PiSmileySad size={`1.1rem`} />
                                    <span>You reached the daily limit. Try again tomorrow!</span>
                                </div>
                            </SelectItem>
                        }
                    </SelectContent>
                </Select>
            </div>
            <div className="flex items-center justify-between max-sm:flex-col max-sm:items-start max-sm:gap-1">
                <Label className='text-black'>City</Label>
                <Select onValueChange={setSelectedCity} value={selectedCity} disabled={!selectedProvince}>
                    <SelectTrigger className={`max-w-full ${ forWarehouse ? 'sm:max-w-96 md:max-w-[35rem] lg:max-w-96' : 'sm:max-w-80' } duration-200`}>
                        <SelectValue placeholder={ !cities ? 'Cannot fetch cities' : 'Select City' }  />
                    </SelectTrigger>
                    <SelectContent>
                        {
                            cities ?
                                cities.map((city: City) => (
                                    <SelectItem key={city.city_id} value={city.city_id}>
                                        {city.type} {city.city_name}
                                    </SelectItem>
                                ))
                            :
                            <SelectItem className="flex items-center gap-2" value={'-1'}>
                                <div className="flex items-center gap-2">
                                    <PiSmileySad size={`1.1rem`} />
                                    <span>You reached the daily limit. Try again tomorrow!</span>
                                </div>
                            </SelectItem>
                        }
                    </SelectContent>
                </Select>
            </div>
            <div className="flex items-center justify-between max-sm:flex-col max-sm:items-start max-sm:gap-1">
                <Label className='text-black'>Address</Label>
                <Input className={`max-w-full ${ forWarehouse ? 'sm:max-w-96 md:max-w-[35rem] lg:max-w-96' : 'sm:max-w-80' } duration-200`} value={defaultAddress || address} onChange={(e) => setAddress(e.target.value)} placeholder="Address" disabled={!selectedCity} />
            </div>
        </section>
    );
}
