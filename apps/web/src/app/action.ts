import { IProductDataSet } from "@/constants"

export async function getCategory(gender:string, type:string) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}categories?gender=${gender}&type=${type}`, {
      method: 'GET',
      next: {revalidate: 1}
    })
    const data = await res.json()
    return data
  }

export async function createCategory(dataSet: {gender: string, type: string, category: string}) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}categories`, {
    method: "POST",
    headers: {
        "content-Type": "application/json"
    },
    body: JSON.stringify(dataSet)
  })
  const data = await res.json()
  return data
}

export async function deleteCategory(id: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}categories/${id}`, {
    method: "DELETE"
  })
  const data = await res.json()
  return data
}

export async function editCategory(dataSet: {gender: string, type: string, category: string, newCategory: string}) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}categories`, {
    method: "PATCH",
    headers: {
      "content-Type": "application/json"
    },
    body: JSON.stringify(dataSet)
  })
  const data = await res.json()
  return data
}

export async function getWarehouse() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}warehouses`, {
    method: "GET"
  })
  const data = await res.json()
  return data
}

export async function createProduct(dataSet:IProductDataSet) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}products`, {
    method: "POST",
    headers: {
      "content-Type": "application/json"
    },
    body: JSON.stringify(dataSet)
  })
  const data = await res.json()
  return data
}

export async function getProduct() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}products`, {
    method: 'GET',
    next: {revalidate: 1}
  })
  const data = await res.json()
  return data
}

export async function getProductSlug(slug:string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}products/${slug}`, {
    method: 'GET',
    next: {revalidate: 1}
  })
  const data = await res.json()
  return data
}

export async function editProduct(dataSet:any, slug:string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}products/${slug}`, {
    method: "PATCH",
    headers: {
      "content-Type": "application/json"
    },
    body: JSON.stringify(dataSet)
  })
  const data = await res.json()
  return data
}

export async function deleteProduct(slug:string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}products/${slug}`, {
    method: "DELETE",
  })
  const data = await res.json()
  return data
}