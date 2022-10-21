import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Customer } from 'src/app/models/customer';
import { CustomerService } from 'src/app/services/customer.service';
import data from '../../services/data.json';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.scss']
})
export class CustomerFormComponent implements OnInit {

  constructor(private fb: FormBuilder, private customerService: CustomerService) { }

  public genderList: any[] = ['', 'male', 'female', 'other'];

  customerForm: FormGroup = this.fb.group({
    firstName: ['', [Validators.required, this.nameValidator]],
    lastName: ['', [Validators.required, this.nameValidator]],
    email: ['', [Validators.required, Validators.email]],
    gender: ['', Validators.required],
    newsletter: ['', Validators.requiredTrue],
    isVIP: ['']
  })

  get firstName() { return this.customerForm.get('firstName');}
  get lastName() { return this.customerForm.get('lastName');}
  get email() { return this.customerForm.get('email');}
  get gender() { return this.customerForm.get('gender');}
  get newsletter() { return this.customerForm.get('newsletter');}
  get isVIP() { return this.customerForm.get('isVIP');}


  ngOnInit(): void {

  }

  public async onSubmit() {
    const collName = this.customerForm.value.isVIP ? 'vipCustomer' : 'customer';
    this.customerForm.get('isVIP')?.disable();
    const newCustomer: Customer = this.customerForm.value;
    console.log(newCustomer);
    try {
      const customerRef = await this.customerService.createCustomer(collName, newCustomer);
      console.log(customerRef.id);
      this.customerForm.reset();
      this.customerForm.get('isVIP')?.enable();
    } catch (error) {
      console.log(error);
    }
  }

  nameValidator(name: AbstractControl): ValidationErrors | null {
    const pattern = /^.{3,15}$/;
    return pattern.test(name.value) ? null : {nameError: 'Does not match name requirements'};

  }

}
