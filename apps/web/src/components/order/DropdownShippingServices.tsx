import { ShippingCost, ShippingCostResponse, ShippingDetail } from '@/constants'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { formatToIDR } from '@/lib/utils';
import { useEffect, useState } from 'react';

interface DropdownShippingServicesProps {
    shippingServices: ShippingCost[] | null
    service: string
    setService: (value: string) => void
    fetchShipping: () => Promise<void>;
    calculateShippingCost: () => void;
}

export default function DropdownShippingServices({ shippingServices, service, setService, fetchShipping, calculateShippingCost }: DropdownShippingServicesProps) {
    const [isFetchShippingCalled, setIsFetchShippingCalled] = useState(false)

    useEffect(() => {
        if (shippingServices && !isFetchShippingCalled) {
            calculateShippingCost();
            setIsFetchShippingCalled(true);
        }
    }, [shippingServices, isFetchShippingCalled, calculateShippingCost]);

    useEffect(() => {
        if (service !== '') {
            fetchShipping().then(() => {
                setIsFetchShippingCalled(false); // Reset flag after fetching
            });
        }
    }, [service, fetchShipping])
    
    return (
        <Select disabled={!shippingServices} value={service} onValueChange={setService}>
            <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Shipping Service" />
            </SelectTrigger>
            <SelectContent>
                {shippingServices && shippingServices.map((service: ShippingCost) => (
                    <SelectItem key={service.service} value={service.service}>
                        <div className='flex w-[70vh] justify-between'>
                            <h1>{service.description}</h1>
                            <h1>{formatToIDR(service.cost[0].value)}</h1>
                        </div>
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
}
