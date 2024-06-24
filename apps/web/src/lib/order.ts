export const cancelOrder = async (orderId: string, adminId: string | null, userId: string | null) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}order/cancelOrder`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId: orderId, adminId: adminId, userId: userId })
    });
    const data = await response.json();
    return data;
}

export const changeToShipped = async (orderId: string, adminId: string) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}order/changeToShipped`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId, adminId })
    });
    const data = await response.json();
    return data;
}