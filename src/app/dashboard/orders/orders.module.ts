import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderslistComponent } from './components/orderslist/orderslist.component';
import { OrderdetailsComponent } from './components/orderdetails/orderdetails.component';
import { RouterModule, Routes } from '@angular/router';
import { PromocodeComponent } from './components/promocode/promocode.component';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  { path: '', component: OrderslistComponent },
  { path: 'orderslist', component: OrderslistComponent },
  { path: 'orderdetails/:orderId', component: OrderdetailsComponent },
  { path: 'promocode', component: PromocodeComponent }
];

@NgModule({
  declarations: [
    OrderslistComponent,
    OrderdetailsComponent,
    PromocodeComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule
  ]
})
export class OrdersModule { }
