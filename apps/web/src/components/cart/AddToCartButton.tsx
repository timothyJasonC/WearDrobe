'use client'
import { useState } from 'react';
import QuantityCounter from './QuantityCounter';
import { addToCart } from "@/lib/cart";
import { useToast } from '../ui/use-toast';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';
import { setCart } from '@/lib/redux/features/cart/cartSlice';

type VariantProps = {
    selectedColor: string;
};

export default function AddToCartButton({ selectedColor }: VariantProps) {
    const [quantity, setQuantity] = useState(1);
    const cart = useAppSelector(state => state.cart.value);
    const dispatch = useAppDispatch();
    const { toast } = useToast();

    const handleAddToCart = async () => {
        try {
            const result = await addToCart(selectedColor, quantity);
            if (result === 'error') throw new Error('Failed to add item to cart')

            toast({
                title: "Add item success",
                description: "Your item has been added to your cart",
                className: "bg-[#ffd6ba] rounded-xl"
            });
            dispatch(setCart(result));
        } catch (error) {
            toast({
                title: "Add item failed",
                description: "Can't add item to your cart, please try again later",
                variant: 'destructive',
                className: "rounded-xl"
            });
        }
    };

    return (
        <div className='mt-2'>
            <div className='flex justify-around'>
                <h1>Quantity: </h1>
                <QuantityCounter quantity={quantity} setQuantity={setQuantity} />
            </div>
            <button
                onClick={handleAddToCart}
                className="mt-4 w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-md"
            >
                Add to Cart
            </button>
        </div>
    );
}
