import React, { useState } from 'react'
import QuantityCounter from './QuantityCounter';
import { useToast } from './ui/use-toast';
import { useCart } from '@/app/CartContext';

type VariantProps = {
    selectedColor: string
}

export default function AddToCartButton({ selectedColor }: VariantProps) {
    const [quantity, setQuantity] = useState(1)
    const { toast } = useToast()
    const { addToCart } = useCart()

    const handleAddToCart = () => {
        addToCart(selectedColor, quantity)
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

    )
}
