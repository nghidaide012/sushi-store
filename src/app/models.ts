export enum OrderStatus {
    Cart = 'Cart',
    Process = 'Processing Order',
    Prepare = 'Preparing Food',
    Delivering  = 'Out for Delivery',
    Completed = 'Completed'
}

export interface Product {
    id?: string,
    title: string,
    description: string,
    price: number;
    categoryId: string,
    kCal: number;
    numOfPiece: number;
    imageUrl: string;
    active: boolean;
}
export interface Category {
    id?: string,
    title: string
}

export interface Order {
    id?: string,
    customerId: string,
    orderDate?: Date,
    status: OrderStatus,
    totalPrice?: number
}
export interface OrderItem {
    id?: string,
    OrderId: string,
    itemId: string, 
    itemName: string,
    itemUrl: string,
    quantity: number,
    price: number
}
