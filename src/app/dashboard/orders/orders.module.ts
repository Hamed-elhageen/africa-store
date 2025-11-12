import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderslistComponent } from './components/orderslist/orderslist.component';
import { OrderdetailsComponent } from './components/orderdetails/orderdetails.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: OrderslistComponent },
  { path: 'orderslist', component: OrderslistComponent },
  { path: 'orderdetails/:orderId', component: OrderdetailsComponent }
];

@NgModule({
  declarations: [
    OrderslistComponent,
    OrderdetailsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class OrdersModule { }
