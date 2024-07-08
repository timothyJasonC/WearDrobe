import { DateRange } from "react-day-picker";

export const cancelOrder = async (orderId: string, adminId: string | null, userId: string | null, currentPage: string | null, date: DateRange) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}order/cancelOrder?q=${encodeURIComponent('')}&limit=${encodeURIComponent('10')}&page=${encodeURIComponent(currentPage || '1')}&w=${encodeURIComponent('')}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId: orderId, adminId: adminId, userId, date })
    });
    const data = await response.json();
    return data;
}

export const changeToShipped = async (orderId: string, adminId: string, currentPage: string | null, date: DateRange) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}order/changeToShipped?q=${encodeURIComponent('')}&limit=${encodeURIComponent('10')}&page=${encodeURIComponent(currentPage || '1')}&w=${encodeURIComponent('')}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId, adminId, date })
    });
    const data = await response.json();
    return data;
}

export const confirmOrder = async (orderId: string, userId: string, currentPage: string | null, date: DateRange) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}order/confirmOrder?q=${encodeURIComponent('')}&limit=${encodeURIComponent('10')}&page=${encodeURIComponent(currentPage || '1')}&w=${encodeURIComponent('')}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId, userId, date })
    });
    const data = await response.json();
    return data;
}