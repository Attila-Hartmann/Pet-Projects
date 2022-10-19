import {Component, OnInit} from '@angular/core';
import {CustomerService} from "../../services/customer.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public resetInProgress: boolean = false;

  constructor(private customerService: CustomerService) {
  }

  public ngOnInit(): void {
  }

  public async resetDatabase(): Promise<void> {
    this.resetInProgress = true;
    await this.customerService.initializeDb();
    this.resetInProgress = false;
  }
}
