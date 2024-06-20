
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

export async function getOrderById(orderId: string) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}order/orderDetail`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: 'user_01', orderId })
    });
    const result = await response.json()
    return result
}

export const getProvinces = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}address/getProvinces`, {
        method: 'GET',
    });
    const result = await response.json()
    return result
};

export const getCities = async (provinceId: string) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}address/getCities`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({provinceId})
    });
    const data = await response.json();
    return data;
};

export const addAddressUser = async (selectedCity: string, address: string) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}address/`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({selectedCity, address, userId: 'user_01' })
    });
    const data = await response.json();
    return data;
}

export const getAddressList = async() => {
    const response =  await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}address/addressList`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({userId: 'user_01' })
    });
    const data = await response.json();
    return data;
}

export const fetchWarehouse = async(address: string) => {
    const response =  await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}address/getClossestWarehouse`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({address: address })
    });
    const data = await response.json();
    return data;
}

export const fetchShippingCost = async(warehouseId: string, userAddress:string, shipping:string) => {
    const response =  await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}address/getShippingCost`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({warehouseId: warehouseId, userAddress: userAddress, shipping: shipping})
    });
    const data = await response.json();
    return data;
}

export const checkoutOrder = async(orderId:string, shippingCost:number, subTotal:number) => {
    const response =  await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}order/`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({orderId: orderId, shippingCost: shippingCost, subTotal: subTotal, userId: 'user_01'})
    });
    const data = await response.json();
    return data;
}

