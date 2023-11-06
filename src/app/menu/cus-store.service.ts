import { Injectable } from '@angular/core';
import { CollectionReference, DocumentReference, Firestore, addDoc, collection, collectionData, deleteDoc, doc, docData, orderBy, query, updateDoc, where } from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';
import { Category, Order, OrderItem, OrderStatus, Product } from '../models';

@Injectable({
  providedIn: 'root'
})
export class CusStoreService {

  constructor(private db: Firestore) { }
  getProducts(): Observable<Product[]>
  {
    return collectionData<Product>(
      query(
      collection(this.db, 'product') as CollectionReference<Product>,
      where('active', '==', true),
      ),
      {idField: 'id'}
    )
  }
  getProductsOfCategory(id: string): Observable<Product[]>{
    return collectionData<Product>(
      query(
        collection(this.db, 'product') as CollectionReference<Product>,
        where("categoryId", '==', id),
        where('active', '==', true)

      ),
      {idField: 'id'}
    )
  }
  getProduct(id: string): Observable<Product | undefined>
  {
    return docData<Product>(
      doc(this.db, 'product/'+id) as DocumentReference<Product>
    )
  }
  getCategories(): Observable<Category[]> {
    return collectionData<Category>(
      query(
      collection(this.db, 'category') as CollectionReference<Category>,
      orderBy('title')
      ),
      {idField: 'id'}
    )
  }
  getCategory(id: string): Observable<Category | undefined>
  {
    return docData<Category>(
      doc(this.db, 'category/' + id) as DocumentReference<Category>
    )
  }
  getOrders(id: string): Observable<Order[]>
  {
    return collectionData<Order>(
      query(
        collection(this.db, 'order') as CollectionReference<Order>,
        where('customerId', '==', id)
      ),
      {idField: 'id'}
    )
  }
  generateCart(id: string)
  {
    const orderCollection = collection(this.db, 'order')
    const newCart: Order = {
      customerId: id,
      status: OrderStatus.Cart
    }
    return from(addDoc(orderCollection, newCart))
  }
  getOrderItems(id: string): Observable<OrderItem[]>
  {
    return collectionData<OrderItem>(
      query(
        collection(this.db, 'orderItem') as CollectionReference<OrderItem>,
        where('OrderId', '==', id)
      ),
      {idField: 'id'}
    )
  }

  createOrderItem(newItem: OrderItem)
  {
    const orderItemCollection = collection(this.db, 'orderItem')
    return from(addDoc(orderItemCollection, newItem))
  }

  updateOrderItem(id: string, newItem: OrderItem)
  {
    const itemRef = doc(this.db, 'orderItem/'+id) as DocumentReference<OrderItem>;
    return from(updateDoc(itemRef, newItem as any))
  }

  deleteOrderItem(id: string)
  {
    const itemRef = doc(this.db, 'orderItem/'+id) as DocumentReference<OrderItem>;
    return from(deleteDoc(itemRef));
  }
  getOrder(id: string): Observable<Order | undefined>
  {
    return docData<Order>(
      doc(this.db, 'order/' + id) as DocumentReference<Order>,
      {idField: 'id'}
    )
  }
  updateOrder(id: string, newOrder: Order)
  {
    const orderRef = doc(this.db, 'order/' + id) as DocumentReference<Order>
    return from(updateDoc(orderRef, newOrder as any))
  }


}
