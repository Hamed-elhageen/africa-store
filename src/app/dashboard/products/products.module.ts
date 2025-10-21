import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductslistComponent } from './components/productslist/productslist.component';
import { AddproductComponent } from './components/addproduct/addproduct.component';
import { EditproductComponent } from './components/editproduct/editproduct.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  { path: '', component: ProductslistComponent },
  { path: 'addproduct', component: AddproductComponent },
  { path: 'editproduct/:prdId', component:EditproductComponent }
];

@NgModule({
  declarations: [
    ProductslistComponent,
    AddproductComponent,
    EditproductComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule
  ]
})
export class ProductsModule { }
