import React from 'react'

type QuantityProps = {
    quantity: number
    setQuantity: (value: number) => void
}

export default function QuantityCounter({ quantity, setQuantity }: QuantityProps) {
    const decreaseQuantity = () => {
        setQuantity(quantity > 1 ? quantity - 1 : 1);
    };

    const increaseQuantity = () => {
        setQuantity(quantity + 1);
    };
    return (
        <div className="flex gap-4 items-center">
            <button
                className="transition-all hover:opacity-75"
                onClick={decreaseQuantity}
            >
                ➖
            </button>

            <h1 className="text-black border-transparent text-center">{quantity}</h1>

            <button
                className="transition-all hover:opacity-75"
                onClick={increaseQuantity}
            >
                ➕
            </button>
        </div>
    )
}
