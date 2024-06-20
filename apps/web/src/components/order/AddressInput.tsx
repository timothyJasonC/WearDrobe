import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { City, Province } from "@/constants";

type AddressProps = {
  selectedProvince: string;
  setSelectedProvince: (value: string) => void;
  provinces: Province[];
  selectedCity: string;
  setSelectedCity: (value: string) => void;
  cities: City[];
  address: string;
  setAddress: (value: string) => void;
}

export default function AddressInputs({ selectedProvince, setSelectedProvince, provinces, setSelectedCity, cities, selectedCity, address, setAddress }: AddressProps) {
  return (
    <section className="flex flex-col gap-2">
      <div className="flex items-center">
        <label className='text-black'>Province :</label>
        <Select onValueChange={setSelectedProvince} value={selectedProvince}>
          <SelectTrigger className="w-[180px]">
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
      <div className="flex items-center">
        <label className='text-black'>City :</label>
        <Select onValueChange={setSelectedCity} value={selectedCity} disabled={!selectedProvince}>
          <SelectTrigger className="w-[180px] mt-4">
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
      <div className="flex flex-col gap-2">
        <label className='text-black'>Address :</label>
        <Input value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Address" disabled={!selectedCity} />
      </div>
    </section>
  );
}
