import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { CustomerFormComponent } from './components/customer-form/customer-form.component';
import { CustomerListComponent } from './components/customer-list/customer-list.component';
import {HomeComponent} from "./components/home/home.component";

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'customer-form', component: CustomerFormComponent},
  {path: 'customer-list', component: CustomerListComponent},
  {path: '', redirectTo: 'home', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
