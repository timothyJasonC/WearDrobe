import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { City, Province } from "@/constants";
import { Label } from "../ui/label";
import Map from "../Map";
import { useEffect, useState } from "react";
import { bandungSubDistricts } from "@/lib/utils";
import { getRequest } from "@/lib/fetchRequests";
import { toast } from "sonner";

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
}

export default function AddressInputs({ selectedProvince, setSelectedProvince, provinces, setSelectedCity, cities, selectedCity, address, setAddress, fetchCities, labelAddress, setLabelAddress, id, forWarehouse }: AddressProps) {

    const [ currentProvince, setCurrentProvince ] = useState('');
    const [ currentCity, setCurrentCity ] = useState('');
    const [ currentSubDistrict, setCurrentSubDistrict ] = useState<any>();
    const [ currentWard, setCurrentWard ] = useState<any>();
    const [ currentNeighbor, setCurrentNeighbor ] = useState<any>();
    const [ currentAddress, setCurrentAddress ] = useState<any>();
    const [ currentRoad, setCurrentRoad ] = useState<any>();
    const [ lngLat, setLngLat ] = useState([])

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
                setSelectedCity(fetchedAddress.city_id)
                setAddress(fetchedAddress.address)
            }
        } catch (error) {
            toast.error('Something went wrong while fetching your address data')
        }
    }

    useEffect(() => {
        if (id) {
            getEditingProvince()
        }
    }, [ id ])
    
    useEffect(() => {
        if (currentProvince) {
            const selected = provinces.filter(prov => prov.province == currentProvince)[0]
            if (selected) setSelectedProvince(selected.province_id)
        }
    }, [ currentProvince ])

    useEffect(() => {
        if (selectedProvince) {
            fetchCities(selectedProvince);
        }
    }, [ selectedProvince ])

    useEffect(() => {
        if (cities) {
            if (id) {
                getEditingCity();
            } else {
                const selected = cities.filter(city => city.city_name == currentCity)[0]
                if (currentSubDistrict) {
                    if (currentSubDistrict?.text_id) {
                        if (bandungSubDistricts.includes(currentSubDistrict?.text_id)) {
                            setSelectedCity('23')
                        } else setSelectedCity(selected?.city_id)
                    } else setSelectedCity(selected?.city_id)
                } else setSelectedCity(selected?.city_id)
                const newAddress = currentAddress || currentRoad?.text_id || currentNeighbor?.text_id || currentWard?.text_id || currentSubDistrict?.text_id || "";
                setAddress(newAddress);
                setCurrentProvince('')
            }
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
                        <SelectValue placeholder="Select Province" />
                    </SelectTrigger>
                    <SelectContent>
                        {provinces.map((province: Province) => (
                        <SelectItem key={province.province_id} value={province.province_id}>
                            {province.province}
                        </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <div className="flex items-center justify-between max-sm:flex-col max-sm:items-start max-sm:gap-1">
                <Label className='text-black'>City</Label>
                <Select onValueChange={setSelectedCity} value={selectedCity} disabled={!selectedProvince}>
                <SelectTrigger className={`max-w-full ${ forWarehouse ? 'sm:max-w-96 md:max-w-[35rem] lg:max-w-96' : 'sm:max-w-80' } duration-200`}>
                    <SelectValue placeholder="Select City" />
                </SelectTrigger>
                <SelectContent>
                    {cities.map((city: City) => (
                    <SelectItem key={city.city_id} value={city.city_id}>
                        {city.type} {city.city_name}
                    </SelectItem>
                    ))}
                </SelectContent>
                </Select>
            </div>
            <div className="flex items-center justify-between max-sm:flex-col max-sm:items-start max-sm:gap-1">
                <Label className='text-black'>Address</Label>
                <Input className={`max-w-full ${ forWarehouse ? 'sm:max-w-96 md:max-w-[35rem] lg:max-w-96' : 'sm:max-w-80' } duration-200`} value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Address" disabled={!selectedCity} />
            </div>
        </section>
    );
}
