import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface DropdownShippingProps {
    shipping : string
    setShipping: (value: string) => void
    warehouseId: string | null
}

export default function DropdownShipping({shipping, setShipping, warehouseId} : DropdownShippingProps) {
    const services = [
        { id: '1', value: 'jne' },
        { id: '2', value: 'tiki' },
        { id: '3', value: 'pos' },
    ]
    
    return (
        <Select disabled={!warehouseId} value={shipping} onValueChange={setShipping}>
            <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Shipping" />
            </SelectTrigger>
            <SelectContent>
                {services.map(service => (
                    <SelectItem key={service.id} value={service.value}>
                        {service.value.toUpperCase()}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
}
