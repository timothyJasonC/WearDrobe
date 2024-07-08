import { IOrderItem2, IProduct, IStockMutationItem } from "@/constants";
import xlsx, { IContent, IJsonSheet } from "json-as-xlsx";

export function downloadStockToExcel(productList: IProduct[], warehouse:string) {
    const content: IContent[] = productList.map(product => ({
        name: product.name,
        id: product.id,
        gender: product.category.gender,
        type: product.category.type,
        category: product.category.category,
        update: product.stockUpdatedAt || 'N/A',
        stockin: product.stockIn._sum.quantity || 0,
        stockout: product.stockOut._sum.quantity || 0,
        stockatdate: product.toDateStock || 0,
        CurrentStock: product.totalStock || 0
    }));


    let columns: IJsonSheet[] = [
        {
            sheet: "Stocks",
            columns: [
                { label: "Product Name", value: "name" },
                { label: "ID", value: "id" },
                { label: "Gender", value: "gender" },
                { label: "Type", value: "type" },
                { label: "Category", value: "category" },
                { label: "Last Updated", value: "update" },
                { label: "Stock In", value: "stockin" },
                { label: "Stock Out", value: "stockout" },
                { label: "Stock at Date", value: "stockatdate" },
                { label: "Current Stock", value: "CurrentStock" },
            ],
            content: content
        }
    ];

    let settings = {
        fileName: `Stocks_${warehouse.replaceAll(' ', '')}`
    };

    xlsx(columns, settings);
}

export function downloadStockDetailsToExcel(stockList: IStockMutationItem[], productName:string, warehouse:string) {
    const content: IContent[] = stockList.map(stock => ({
        variant: stock.WarehouseProduct.productVariant.color,
        size: stock.WarehouseProduct.size,
        type: stock.stockMutation?.type || 'N/A',
        warehouse: stock.WarehouseProduct.warehouse?.warehouseName || 'N/A',
        associatedWH: stock.associatedWH?.warehouseName || 'N/A',
        date: stock.stockMutation?.updatedAt || stock.stockMutation?.createdAt || 'N/A',
        quantity: stock.quantity || 0
    }));

    let columns: IJsonSheet[] = [
        {
            sheet: "Stock Details",
            columns: [
                { label: "Variant", value: "variant" },
                { label: "Size", value: "size" },
                { label: "Type", value: "type" },
                { label: "Warehouse", value: "warehouse" },
                { label: "Associated WH", value: "associatedWH" },
                { label: "Date", value: "date" },
                { label: "Quantity", value: "quantity" },
            ],
            content: content
        }
    ];

    let settings = {
        fileName: `StockDetails_${productName.replaceAll(' ','')}_${warehouse.replaceAll(' ','')}`
    };

    xlsx(columns, settings);
}

export function downloadSalesToExcel(salesList: IProduct[], warehouse:string) {
    const content: IContent[] = salesList.map(item => ({
        productName: item.name,
        gender: item.category.gender,
        type: item.category.type,
        category: item.category.category,
        transactions: item.analytics._count.id || 0,
        qtySold: item.analytics._sum.quantity || 0,
        gross: item.analytics._sum.price || 0
    }));

    let columns: IJsonSheet[] = [
        {
            sheet: "Sales",
            columns: [
                { label: "Product Name", value: "productName" },
                { label: "Gender", value: "gender" },
                { label: "Type", value: "type" },
                { label: "Category", value: "category" },
                { label: "Transactions", value: "transactions" },
                { label: "Qty Sold", value: "qtySold" },
                { label: "Gross (IDR)", value: "gross" },
            ],
            content: content
        }
    ];

    let settings = {
        fileName: `Sales_${warehouse.replaceAll(' ', '')}`
    };

    xlsx(columns, settings);
}

export function downloadSalesDetailsToExcel(salesData: IOrderItem2[], productName:string, warehouse:string) {
    const content: IContent[] = salesData.map(item => {        
        return {
            invoiceId: item.orderId,
            variants: item.productVariant.color,
            size: item.size,
            userId: item.order.userId,
            date: item.updatedAt,
            cityDestination: item.order.user?.addresses[0]?.city_name || 'N/A',
            quantity: item.quantity,
            gross: item.price
        };
    });

    let columns: IJsonSheet[] = [
        {
            sheet: "SalesDetails",
            columns: [
                { label: "Invoice ID", value: "invoiceId" },
                { label: "Variants", value: "variants" },
                { label: "Size", value: "size" },
                { label: "User ID", value: "userId" },
                { label: "Date", value: "date" },
                { label: "City Destination", value: "cityDestination" },
                { label: "Quantity", value: "quantity" },
                { label: "Gross", value: "gross" },
            ],
            content: content
        }
    ];

    let settings = {
        fileName: `SalesDetails_${productName.replaceAll(' ','')}_${warehouse.replaceAll(' ','')}`
    };

    xlsx(columns, settings);
}

export function downloadProductsToExcel(productList: IProduct[], warehouse:string) {
    const content: IContent[] = productList.map(product => {
        return {
            productName: product.name,
            productId: product.id,
            gender: product.category.gender.toLocaleLowerCase(),
            type: product.category.type.toLocaleLowerCase(),
            category: product.category.category,
            created: product.createdAt,
            updated: product.updatedAt || 'N/A',
            variants: product.variants.map(item => item.color).join(', '),
            size: product.oneSize ? "One Size" : "S M L XL",
            price: product.price
        };
    });

    let columns: IJsonSheet[] = [
        {
            sheet: "Products",
            columns: [
                { label: "Product Name", value: "productName" },
                { label: "Product ID", value: "productId" },
                { label: "Gender", value: "gender" },
                { label: "Type", value: "type" },
                { label: "Category", value: "category" },
                { label: "Created", value: "created" },
                { label: "Updated", value: "updated" },
                { label: "Variants", value: "variants" },
                { label: "Size", value: "size" },
                { label: "Price (IDR)", value: "price" }
            ],
            content: content
        }
    ];

    let settings = {
        fileName: `Products_${warehouse.replaceAll(' ', '')}`
    };

    xlsx(columns, settings);
}


