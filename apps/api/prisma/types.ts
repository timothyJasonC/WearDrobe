export interface User {
    id: string
    accountActive: boolean
    username?: string | null
    email: string
    password?: string | null
    gender?: Gender | null
    dob?: Date | null
    createdAt: Date
    imgUrl?: string | null
    addresses: AddressList[]
    orders: Order[]
  }
  
  export interface AddressList {
    id: string
    address: string
    coordinate: string
    userID: string
    city_id: string
    province_id: string
    province: string
    type: string
    city_name: string
    postal_code: string
    mainAddress: boolean
    user: User
  }
  
  export interface Order {
    id: string
    userId: string
    status: OrderStatus
    warehouseId?: string | null
    totalAmount: number
    paymentStatus: PaymentStatus
    createdAt: Date
    updatedAt: Date
    user: User
    items: OrderItem[]
  }
  
  export interface OrderItem {
    id: string
    orderId: string
    productVariantId: string
    warehouseId?: string | null
    color: string
    size: string
    quantity: number
    price: number
    createdAt: Date
    updatedAt: Date
    order: Order
    productVariant: ProductVariant
  }
  
  export interface ProductVariant {
    id: string
    productID: string
    color: string
    HEX: string
    image: string
    warehouseProduct: WarehouseProduct[]
    orderItems: OrderItem[]
  }
  
  export interface WarehouseProduct {
    id: string
    warehouseID: string
    productVariantID: string
    size: ProductSize
    stock: number
    warehouse: Warehouse
    productVariant: ProductVariant
    StockMutation: StockMutation[]
  }
  
  export interface Warehouse {
    id: string
    warehouseName: string
    coordinate: string
    address: string
    city_id: string
    province_id: string
    province: string
    type: string
    city_name: string
    postal_code: string
    createdAt: Date
    adminID: string
    admin: Admin
    products: WarehouseProduct[]
    mutations: StockMutation[]
  }
  
  export interface Admin {
    id: string
    role: Role
    accountActive: boolean
    fullName?: string | null
    email: string
    password?: string | null
    gender?: Gender | null
    dob?: Date | null
    createdAt: Date
    Warehouse?: Warehouse | null
  }
  
  export interface StockMutation {
    id: string
    warehouseID: string
    associatedWarehouseId?: string | null
    type: MutationTypes
    warehouseProductID: string
    size: ProductSize
    quantity: number
    createdAt: Date
    warehouse: Warehouse
    warehouseProduct: WarehouseProduct
  }
  
  export interface PasswordRequest {
    id: string
    accountId: string
    currentToken?: string | null
    requestCount: number
    createdAt: Date
    updatedAt?: Date | null
  }
  
  export interface Product {
    id: string
    name: string
    slug: string
    description: string
    price: number
    oneSize: boolean
    categoryID: string
    thumbnailURL?: string | null
    createdAt: Date
    images: ProductImage[]
    variants: ProductVariant[]
    category: ProductCategory
  }
  
  export interface ProductCategory {
    id: string
    gender: ProductGender
    type: ProductTypes
    category: string
    products: Product[]
  }
  
  export interface ProductImage {
    id: string
    productID: string
    image: string
    product: Product
  }
  
  export enum Gender {
      MALE = 'MALE',
      FEMALE = 'FEMALE',
    }
    
  export enum Role {
  warAdm = 'warAdm',
  superAdm = 'superAdm',
  }
  
  export enum ProductGender {
  MEN = 'MEN',
  WOMEN = 'WOMEN',
  UNISEX = 'UNISEX',
  }
  
  export enum ProductTypes {
  TOPS = 'TOPS',
  BOTTOMS = 'BOTTOMS',
  ACCESSORIES = 'ACCESSORIES',
  }
  
  export enum ProductSize {
  S = 'S',
  M = 'M',
  L = 'L',
  XL = 'XL',
  ONESIZE = 'ONESIZE',
  }
  
  export enum MutationTypes {
  TRANSFER = 'TRANSFER',
  RESTOCK = 'RESTOCK',
  REMOVE = 'REMOVE',
  TRANSACTION = 'TRANSACTION',
  INBOUND = 'INBOUND',
  }
  
  export enum PaymentStatus {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  }
  
  export enum OrderStatus {
  CART = 'CART',
  PENDING_PAYMENT = 'PENDING_PAYMENT',
  PROCESSED = 'PROCESSED',
  SHIPPED = 'SHIPPED',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
  }