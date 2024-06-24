'use client'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import QuantityCounter from './QuantityCounter'
import { IOrderItem } from '@/constants'
import { formatToIDR, getUserClientSide } from '@/lib/utils'
import { updateCartItemQuantity } from '@/lib/cart'
import { useAppDispatch } from '@/lib/redux/hooks'
import { setCart } from '@/lib/redux/features/cart/cartSlice'
import { DeleteOrderItemAlert } from './DeleteCartItem'

type OrderItemProps = {
    item: IOrderItem;
};

export default function CartItem({item}: OrderItemProps) {
    const [quantity, setQuantity] = useState(item.quantity)
    const dispatch = useAppDispatch();

    const handleSetQuantity = async (newQuantity: number) => {
        setQuantity(newQuantity);
        const userData = await getUserClientSide()
        const updatedCart = await updateCartItemQuantity(item.id, newQuantity, userData.id); 
        dispatch(setCart(updatedCart))
    }
    
    return (
        <div className='relative flex w-full gap-4'>
            <div className='relative flex h-32 rounded-md'>
                <Image src={item.productVariant.image} alt='none'
                    className='object-cover rounded-md' width={200} height={200} />
            </div>
            <div className='w-full my-auto'>
                <h1 className="font-semibold max-w-44 truncate">{item.productVariant.product.name}</h1>
                <h1 className="max-w-44 truncate">variant: {item.productVariant.color}</h1>
                <h1 className="max-w-44 truncate">Size: {item.size}</h1>
                <QuantityCounter quantity={quantity} setQuantity={handleSetQuantity} />
                <h1>Total Price : {formatToIDR(item.price)}</h1>
                <DeleteOrderItemAlert orderItemId={item.id}/>
            </div>

        </div>
    )
}
