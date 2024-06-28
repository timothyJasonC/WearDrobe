'use client'
import { useState } from 'react';
import QuantityCounter from './QuantityCounter';
import { addToCart } from "@/lib/cart";
import { toast } from "sonner"

import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';
import { setCart } from '@/lib/redux/features/cart/cartSlice';
import { getUserClientSide } from '@/lib/utils';
import { Button } from '../ui/button';
import { PiShoppingCart } from 'react-icons/pi';

type AddToCartButtonProps = {
    variantId: string
    color: string
    size: string
    quantity: number
    stock: number
}

export default function AddToCartButton({ variantId, color, size, quantity, stock }: AddToCartButtonProps) {
    const dispatch = useAppDispatch();

    const handleAddToCart = async () => {
        try {
            const userData = await getUserClientSide()
            const result = await addToCart(userData.id, variantId, color, size, quantity);
            if (result === 'error') throw new Error('Failed to add item to cart')
            toast.success('Your item has been added to your cart')
            dispatch(setCart(result));
        } catch (error) {
            toast.error("Can't add item to your cart, please try again later")
        }
    };

    return (
        <div className={`${quantity == 0 ? 'cursor-not-allowed' : ''}`}>
            <Button className='w-full gap-2 ' onClick={handleAddToCart} disabled={stock == 0 ? true : false || quantity == 0}>
                ADD TO CART
                <PiShoppingCart className='text-xl' />
            </Button>
        </div>
    );
}
