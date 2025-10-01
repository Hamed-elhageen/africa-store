import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductslistComponent } from './productslist/productslist.component';
import { AddproductComponent } from './addproduct/addproduct.component';
import { EditproductComponent } from './editproduct/editproduct.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: ProductslistComponent },
  { path: 'add', component: AddproductComponent },
  { path: 'edit', component:EditproductComponent }
];

@NgModule({
  declarations: [
    ProductslistComponent,
    AddproductComponent,
    EditproductComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class ProductsModule { }
