import { Injectable } from '@angular/core';
import { CollectionReference, DocumentReference, Firestore, addDoc, collection, collectionData, deleteDoc, doc, docData, orderBy, query, updateDoc, where, writeBatch } from '@angular/fire/firestore';
import { Observable, from, map } from 'rxjs';
import {Product, Category, Order, OrderItem, OrderStatus} from '../models';
import {getDownloadURL, ref, Storage, uploadBytesResumable} from '@angular/fire/storage';

@Injectable({
  providedIn: 'any'
})
export class StoreService {

  constructor(private db: Firestore, private storage: Storage) { }

  getProducts(): Observable<Product[]>
  {
    return collectionData<Product>(
      collection(this.db, 'product') as CollectionReference<Product>,
      {idField: 'id'}
    )
  }
  getProductsOfCategory(id: string): Observable<Product[]>{
    return collectionData<Product>(
      query(
        collection(this.db, 'product') as CollectionReference<Product>,
        where("categoryId", '==', id)
      ),
      {idField: 'id'}
    )
  }

  deleteProductsOfCategory(id: string)
  {
    return collectionData<Product>(
      query(
        collection(this.db, 'product') as CollectionReference<Product>,
        where("categoryId", '==', id)
      ),
      {idField: 'id'}
    ).pipe(
      map(products => {
        const batch = writeBatch(this.db);
        const categoryRef = doc(this.db, 'category/' + id);
        batch.delete(categoryRef);
        products.forEach(product => {
          const productRef = doc(this.db, 'product/'+product.id);
          batch.delete(productRef)
        })
        return from(batch.commit());
      }) 
    )
  }

  getProduct(id: string): Observable<Product | undefined>
  {
    return docData<Product>(
      doc(this.db, 'product/'+id) as DocumentReference<Product>
    )
  }
  createProducts(newProduct: Product)
  {
    const productCollection = collection(this.db, 'product');
    return from(addDoc(productCollection, newProduct));
  }
  deleteProduct(id: string)
  {
    const ProductRef = doc(this.db, 'product/'+id) as DocumentReference<Product>
    return from(deleteDoc(ProductRef))
  }
  updateProduct(product: Product, id: string)
  {
    const productRef = doc(this.db, 'product/'+id) as DocumentReference<Product>
    return from(updateDoc(productRef, product as any));
  }
  getCategories(): Observable<Category[]> {
    return collectionData<Category>(
      collection(this.db, 'category') as CollectionReference<Category>,
      {idField: 'id'}
    )
  }
  createCategory(newCategory: Category)
  {
    const categoryCollection = collection(this.db, 'category');
    return from(addDoc(categoryCollection, newCategory));
  }
  deleteCategory(id: string)
  {
    const CateRef = doc(this.db, 'category/'+id) as DocumentReference<Category>
    return from(deleteDoc(CateRef))
  }
  getCategory(id: string): Observable<Category | undefined>
  {
    return docData<Category>(
      doc(this.db, 'category/'+id) as DocumentReference<Category>
    )
  }
  updateCategory(newCategory: Category, id: string)
  {
    const CateRef = doc(this.db, 'category/' +id) as DocumentReference<Category>;
    return from(updateDoc(CateRef, newCategory as any));
  }

  async uploadImg(path: string, file: File): Promise<string>
  {
    const storageRef = ref(this.storage, path);
    const task = uploadBytesResumable(storageRef, file);
    await task;
    const url = await getDownloadURL(storageRef);
    return url;
  }
  getOrders(): Observable<Order[]>
  {
    return collectionData<Order>(
      query(
        collection(this.db, 'order') as CollectionReference<Order>,
      ),
      {idField: 'id'}
    )
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
  updateOrder(id: string, newOrder: Order)
  {
    const orderRef = doc(this.db, 'order/' + id) as DocumentReference<Order>
    return from(updateDoc(orderRef, newOrder as any))
  }
  getOrder(id: string): Observable<Order | undefined>
  {
    return docData<Order>(
      doc(this.db, 'order/' + id) as DocumentReference<Order>,
      {idField: 'id'}
    )
  }
  deleteOrder(id: string)
  {
    const OrderRef = doc(this.db, 'order/'+id) as DocumentReference<Order>
    return from(deleteDoc(OrderRef))
  }
}
