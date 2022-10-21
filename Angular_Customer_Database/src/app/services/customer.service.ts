import { Injectable } from '@angular/core';
import {
  collection,
  doc,
  Firestore,
  getDocs,
  writeBatch,
} from '@angular/fire/firestore';
import data from './data.json';
import { Customer } from '../models/customer';
import {
  AngularFirestore,
  DocumentReference,
} from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { collectionData } from 'rxfire/firestore';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private static readonly REGULAR_CUSTOMER_COLLECTION: string = 'customer';
  private static readonly VIP_CUSTOMER_COLLECTION: string = 'vipCustomer';

  constructor(private firestore: Firestore, private afs: AngularFirestore) {}

  public async initializeDb(): Promise<void> {
    await this.dropCollection(CustomerService.REGULAR_CUSTOMER_COLLECTION);
    await this.dropCollection(CustomerService.VIP_CUSTOMER_COLLECTION);
    await this.uploadCollection(
      CustomerService.REGULAR_CUSTOMER_COLLECTION,
      data.customers
    );
    await this.uploadCollection(
      CustomerService.VIP_CUSTOMER_COLLECTION,
      data.vipCustomers
    );
  }

  private async dropCollection(collectionName: string): Promise<void> {
    console.log(`Dropping collection ${collectionName}`);

    const c = collection(this.firestore, collectionName);
    const snapshot = await getDocs(c);

    const batch = writeBatch(this.firestore);
    for (let doc of snapshot.docs) {
      batch.delete(doc.ref);
    }
    await batch.commit();

    console.log(`Done!`);
  }

  private async uploadCollection(
    collectionName: string,
    data: { [key: string]: Customer }
  ): Promise<void> {
    console.log(`Uploading collection ${collectionName}`);

    const batch = writeBatch(this.firestore);
    for (let id in data) {
      delete data[id].id;
      batch.set(doc(this.firestore, collectionName, id), data[id]);
    }
    await batch.commit();
    console.log(`Done!`);
  }

  // CREATE & READ customers
  public createCustomer(
    collName: string,
    customer: Customer
  ): Promise<DocumentReference<Customer>> {
    const customerCollection = this.afs.collection<Customer>(
      CustomerService.REGULAR_CUSTOMER_COLLECTION
    );
    const vipCustomerCollection = this.afs.collection<Customer>(
      CustomerService.VIP_CUSTOMER_COLLECTION
    );
    return collName === 'vipCustomer'
      ? vipCustomerCollection.add(customer)
      : customerCollection.add(customer);
  }

  getUsers(collName: string): Observable<Customer[]> {
    const usersRef = collection(this.firestore, collName);
    return collectionData(usersRef, { idField: '_id' }) as Observable<
      Customer[]
    >;
  }

  getCustomers(): Observable<Customer[]> {
    return this.getUsers('customer');
  }

  getVipCustomers(): Observable<Customer[]> {
    return this.getUsers('vipCustomer');
  }
}
