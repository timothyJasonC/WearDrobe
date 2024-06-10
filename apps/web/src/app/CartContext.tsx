'use client'
import { useToast } from '@/components/ui/use-toast';
import { IOrder, initialOrder } from '@/constants'
import React, { createContext, useContext, useEffect, useState } from 'react'

interface CartContextProps {
    cart: IOrder;
    addToCart: (productVariantId: string, quantity: number) => Promise<void>;
    getCartItems: () => Promise<void>;
}

export const CartContext = createContext<CartContextProps | undefined>(undefined);

export default function CartProvider({ children }: { children: React.ReactNode }) {
    const [cart, setCart] = useState<IOrder>(initialOrder)
    const { toast } = useToast()

    async function getCartItems() {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/order/cart_item`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId: 'user_01' })
        });
        if (response.ok) {
            setCart(await response.json());
        }
    }

    async function addToCart(variantId: string, quantity: number) {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/order/cart`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId: 'user_01', variantId, quantity })
        });
        const data = await response.json();
        if (response.ok) {
            toast({
                title: "Add item success",
                description: "Your item has been added to your cart",
                className: "bg-[#ffd6ba] rounded-xl"
            })
            console.log(data.items);

            const existingItemIndex = cart.items.findIndex(item => item.productVariantId === data.items.productVariantId)
            if (existingItemIndex !== -1) {
                const updatedCart = { ...cart }
                updatedCart.items[existingItemIndex].quantity = data.items.quantity;
                setCart(updatedCart)
            } else {
                setCart(prevCart => ({
                    ...prevCart,
                    items: [...prevCart.items, data.items],
                }))
            }
        } else {
            toast({
                title: "Add item failed",
                description: "Can't add item to your cart, please try again later",
                variant: 'destructive',
                className: "rounded-xl"
            })

        }
    }

    useEffect(() => {
        getCartItems();
    }, []);

    return (
        <CartContext.Provider value={{ cart, addToCart, getCartItems }}>
            {children}
        </CartContext.Provider>
    )
}


export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};