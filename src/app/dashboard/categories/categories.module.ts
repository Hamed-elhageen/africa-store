import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategorieslistComponent } from './categorieslist/categorieslist.component';
import { AddcategoryComponent } from './addcategory/addcategory.component';
import { EditcategoryComponent } from './editcategory/editcategory.component';
import { RouterModule, Routes } from '@angular/router';
import { Router } from 'express';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  { path: '', component: CategorieslistComponent },
  { path: 'addcategory', component: AddcategoryComponent },
  { path: 'editcategory', component: EditcategoryComponent }
];

@NgModule({
  declarations: [
    CategorieslistComponent,
    AddcategoryComponent,
    EditcategoryComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule
  ]
})
export class CategoriesModule { }
