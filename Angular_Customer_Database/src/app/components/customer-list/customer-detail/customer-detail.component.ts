import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Customer } from 'src/app/models/customer';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.scss']
})
export class CustomerDetailComponent implements OnInit {

  @Input() public custDetail?: Customer;
  @Output() public closeModal: EventEmitter<void> = new EventEmitter<void>()

  constructor() { }

  ngOnInit(): void {
  }

  public emitCloseModal(): void {
    this.closeModal.emit()
  }

}
