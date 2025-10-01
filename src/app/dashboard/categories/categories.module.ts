import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategorieslistComponent } from './categorieslist/categorieslist.component';
import { AddcategoryComponent } from './addcategory/addcategory.component';
import { EditcategoryComponent } from './editcategory/editcategory.component';
import { RouterModule, Routes } from '@angular/router';
import { Router } from 'express';

const routes: Routes = [
  { path: '', component: CategorieslistComponent },
  { path: 'add', component: AddcategoryComponent },
  { path: 'edit', component: EditcategoryComponent }
];

@NgModule({
  declarations: [
    CategorieslistComponent,
    AddcategoryComponent,
    EditcategoryComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class CategoriesModule { }
