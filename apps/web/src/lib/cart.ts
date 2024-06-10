
export async function getCartItems() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}order/cart_item`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: 'user_01' })
    });

    const result = await response.json()
    return result
}

export async function addToCart(variantId: string, quantity: number) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/order/cart`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId: 'user_01', variantId, quantity })
        });
        const data = await response.json();
    
        if (!response.ok) {
            throw new Error(data.message || 'Failed to add item to cart');
        }

        return data;
    } catch (err) {
        console.error('Add to cart error:', err);
        return 'error';
    }
}