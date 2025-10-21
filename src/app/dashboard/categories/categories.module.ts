import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategorieslistComponent } from './components/categorieslist/categorieslist.component';
import { AddcategoryComponent } from './components/addcategory/addcategory.component';
import { EditcategoryComponent } from './components/editcategory/editcategory.component';
import { RouterModule, Routes } from '@angular/router';
import { Router } from 'express';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  { path: '', component: CategorieslistComponent },
  { path: 'addcategory', component: AddcategoryComponent },
  { path: 'editcategory/:catId', component: EditcategoryComponent }
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
