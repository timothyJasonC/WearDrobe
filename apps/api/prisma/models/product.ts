import { ProductTypes } from "@prisma/client";
import { ProductGender } from "prisma/types";
import { v4 as uuid } from "uuid";

export async function listProductCategory() {
    return [
        {   
            id: uuid(),
            gender: ProductGender.MEN,
            type: ProductTypes.TOPS,
            category: 'Shirts',
        },
    ]
}

export async function listProduct() {
    return [
        {
            id: uuid(),
            name: 'Cool Shirt',
            slug: 'cool-shirt',
            description: 'A very cool shirt.',
            price: 100,
            oneSize: false,
            categoryID: 'category id', // change this
            thumbnailURL: 'http://example.com/coolshirt.jpg',
            createdAt: new Date(),
        },
    ]
}

export async function listProductImage() {
    return [
        {
            id: uuid(),
            productID: 'product id', // change this
            image: 'http://example.com/coolshirt.jpg',
        },
    ]
}

export async function listProductVariant() {
    return [
        {
            id: uuid(),
            productID: 'product id', // change this
            color: 'Red',
            HEX: '#FF0000',
            image: 'http://example.com/coolshirt-red.jpg',
        },
    ]
}