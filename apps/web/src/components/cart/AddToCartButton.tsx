'use client'
import { useState } from 'react';
import QuantityCounter from './QuantityCounter';
import { addToCart } from "@/lib/cart";
import { toast } from "sonner"

import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';
import { setCart } from '@/lib/redux/features/cart/cartSlice';
import { getUserClientSide } from '@/lib/utils';
import { Button } from '../ui/button';

export default function AddToCartButton() {
    const [quantity, setQuantity] = useState(1);
    const cart = useAppSelector(state => state.cart.value);
    const dispatch = useAppDispatch();

    const handleAddToCart = async () => {
        try {
            const userData = await getUserClientSide()
            const variantId = '1'
            const color = 'Black'
            const size = 'M'
            const result = await addToCart(userData.id, variantId, color, size, quantity);
            if (result === 'error') throw new Error('Failed to add item to cart')
            toast.success('Your item has been added to your cart')
            dispatch(setCart(result));
        } catch (error) {
            toast.error("Can't add item to your cart, please try again later")
        }
    };

    return (
        <div className='flex flex-col gap-2 mt-2'>
            <div className='flex justify-around'>
                <h1>Quantity: </h1>
                <QuantityCounter quantity={quantity} setQuantity={setQuantity} />
            </div>
            <Button className='rounded-full w-full' size={"lg"} onClick={handleAddToCart}>
                Add to Cart
            </Button>
        </div>
    );
}
