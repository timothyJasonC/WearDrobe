'use client'

import CartItem from "@/components/cart/CartItem";
import SectionHeaders from "@/components/order/SectionHeaders";
import { ShippingCost } from "@/constants";
import { fetchShippingCost, checkoutOrder } from "@/lib/cart";
import { formatToIDR, getUserClientSide } from "@/lib/utils";
import { useEffect, useState } from "react";
import DropdownAddress from "@/components/order/DropdownAddress";
import DropdownShipping from "@/components/order/DropdownShipping";
import DropdownShippingServices from "@/components/order/DropdownShippingServices";
import { useAppSelector } from "@/lib/redux/hooks";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Loading from "@/app/Loading";

type CheckoutProps = {
    params: {
        id: string
    }
}

export default function page({ params: { id } }: CheckoutProps) {
    const cart = useAppSelector(state => state.cart.value);
    const [totalAmount, setTotalAmount] = useState(0);
    const [warehouseId, setWarehouseId] = useState<string | null>(null);
    const [userAddress, setUserAddress] = useState<string | null>(null);
    const [shipping, setShipping] = useState<string>('');
    const [shippingService, setShippingService] = useState<ShippingCost[] | null>(null);
    const [service, setService] = useState<string>('');
    const [shippingCost, setShippingCost] = useState<number>(0);
    const [selectedShipping, setSelectedShipping] = useState<ShippingCost>()
    const [isLoading, setIsLoading] = useState(true)
    const router = useRouter()

    const getUser = async () => {
        const user = await getUserClientSide()
        if (user === undefined) router.push('/auth')
        return
    }

    const fetchShipping = async () => {
        try {
            const result = await fetchShippingCost(warehouseId!, userAddress!, shipping);
            setShippingService(result[0].costs);
        } catch (err) {
            console.log(err);
        }
    };

    const calculateShippingCost = async () => {
        const res = shippingService?.filter(item => item.service === `${service}`);
        if (res !== undefined && res.length > 0) {
            const cost = res[0].cost[0].value;
            setShippingCost(cost);
            setSelectedShipping(res[0])
        }
    }

    useEffect(() => {
        if (cart === null) router.push('/404')
        getUser()
        if (cart && cart.items !== undefined) {
            setTotalAmount(cart.items.reduce((acc, item) => acc + item.price, 0));
        } else {
            setTotalAmount(0);
        }
        setIsLoading(false)
    }, [cart, cart?.items]);

    useEffect(() => {
        if (shipping !== '') {
            fetchShipping();
        }
        if (service !== '') {
            calculateShippingCost();
        }
    }, [shipping, service]);

    const handleCheckout = async () => {
        const result = await checkoutOrder(id, shippingCost, totalAmount, warehouseId!, userAddress!, shipping, selectedShipping)
        router.push(result.redirect_url);
    }


    if (isLoading) {
        return <Loading />
    }

    return (
        <section className="mt-8 px-7">
            <div className="text-center">
                <SectionHeaders mainHeader="Cart" />
            </div>
            <div className="mt-8 grid gap-8 md:grid-cols-2">
                <div>
                    <div className="flex flex-col gap-4">
                        {cart && cart.items !== undefined && cart.items.length > 0 ? cart.items.map((item, idx) => (
                            <CartItem key={idx} item={item} />
                        )) : (
                            <div>No products in your shopping cart</div>
                        )}
                    </div>
                    <div className="py-2 pr-16 flex justify-end items-center">
                        <div className="text-gray-500">
                            Subtotal:<br />
                            Delivery:<br />
                            Total:
                        </div>
                        <div className="font-semibold pl-2 text-right">
                            {formatToIDR(totalAmount)}<br />
                            {shippingCost === 0 ? 'Calculating cost' : formatToIDR(shippingCost)}<br />
                            {shippingCost === 0 ? 'Calculating cost' : formatToIDR(totalAmount + shippingCost)}
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-4 bg-gray-100 p-4 rounded-lg">
                    <h2>Checkout</h2>
                    <h2>Set Address :</h2>
                    <DropdownAddress setUserAddress={setUserAddress} setWarehouseId={setWarehouseId} />
                    <h2>Set Courier :</h2>
                    <DropdownShipping shipping={shipping} setShipping={setShipping} warehouseId={warehouseId} />
                    <DropdownShippingServices shippingServices={shippingService} service={service} setService={setService} />
                    <div className={`${!service ? 'hover:cursor-not-allowed' : ''}`}>
                        <Button onClick={handleCheckout} disabled={!service} className='rounded-full w-full' size={"lg"}>
                            {!service ? 'calculating cost' : 'checkout'}
                        </Button>
                    </div>
                </div>
            </div>

        </section>
    );
}
