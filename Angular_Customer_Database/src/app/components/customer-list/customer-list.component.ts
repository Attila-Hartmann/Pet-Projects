import { Component, OnInit } from '@angular/core';
import { Observable, zip } from 'rxjs';
import { map } from 'rxjs/operators';
import { Customer } from 'src/app/models/customer';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss'],
})
export class CustomerListComponent implements OnInit {
  constructor(private customerService: CustomerService) {}

  public users$?: Observable<Customer[]>;
  public customers$?: Observable<Customer[]>;
  public vipCustomers$?: Observable<Customer[]>;
  public custDetailIsVisible: boolean = false;
  public customerDetail: Customer | undefined;

  ngOnInit(): void {
    this.customers$ = this.customerService.getCustomers();
    this.vipCustomers$ = this.customerService
      .getVipCustomers()
      .pipe(
        map((customerArray) =>
          customerArray.map((element) => ({ isVIP: true, ...element }))
        )
      );

    this.users$ = zip(this.customers$, this.vipCustomers$).pipe(
      map((element) => element[0].concat(element[1])),
      map((elements) => elements.sort(this.compareFn))
    );
  }

  compareFn(customer1: Customer, customer2: Customer) {
    if (customer1.lastName < customer2.lastName) {
      return -1;
    } else if (customer1.lastName > customer2.lastName) {
      return 1;
    } else {
      return 0;
    }
  }

  public openModal(customer: Customer): void {
    this.customerDetail = customer;
    this.custDetailIsVisible = true;
  }

  public closeModal(): void {
    this.custDetailIsVisible = false;
  }
}
