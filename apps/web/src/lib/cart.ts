
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
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}order/cart`, {
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
        return 'error';
    }
}

export async function updateCartItemQuantity(itemId: string, newQuantity: number, userId: string) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}order/updateCartItem`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ itemId, newQuantity, userId }),
    });

    if (!response.ok) {
        throw new Error('Failed to update cart item');
    }

    return response.json();
}

export async function deleteCartItem(itemId: string, userId: string) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}order/deleteCartItem`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ itemId, userId }),
    });

    if (!response.ok) {
        throw new Error('Failed to delete cart item');
    }

    return response.json();
}
