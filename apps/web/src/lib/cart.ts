'use client'
export async function getCartItems() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}order/cart_item`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: 'user_01' })
    });

    const result = await response.json()
    return result
}