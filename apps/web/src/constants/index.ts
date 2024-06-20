export const initialOrder: IOrder = {
    id: "",
    userId: "",
    status: "CART",
    paymentProof: null,
    warehouseId: null,
    totalAmount: 0,
    paymentMethod: null,
    paymentStatus: "PENDING",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    items: []
};

export interface IOrder {
    id: string;
    userId: string;
    status: "CART" | "PENDING" | "COMPLETED" | "CANCELLED";
    paymentProof: string | null;
    warehouseId: string | null;
    totalAmount: number;
    paymentMethod: string | null;
    paymentStatus: "PENDING" | "PAID" | "FAILED";
    createdAt: string; // ISO date string
    updatedAt: string; // ISO date string
    items: IOrderItem[];
}

export interface IOrderItem {
    id: string;
    orderId: string;
    productVariantId: string;
    quantity: number;
    price: number;
    createdAt: string; // ISO date string
    updatedAt: string; // ISO date string
    productVariant: {color: string, image: string, product: {name: string}}
}

export interface Province {
    province_id: string;
    province: string;
}

export interface City {
    city_id: string;
    city_name: string;
    type?: string
}

export interface Address {
    id: string;
    coordinate: string;
    mainAddress: boolean;
}

export interface Warehouse {
    id: string;
    warehouseName: string;
    city: string;
    coordinate: string;
    address: string;
    city_id: string;
    province_id: string;
    province: string;
    type: string;
    city_name: string;
    postal_code: string;
    createdAt: string;
    adminID: string;
}

export interface ShippingCostResponse {
    code: string;
    name: string;
    costs: ShippingCost[];
}

export interface ShippingCost {
    service: string;
    description: string;
    cost: ShippingDetail[];
}

export interface ShippingDetail {
    value: number;
    etd: string;
    note: string;
}