import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoponslistComponent } from './components/coponslist/coponslist.component';
import { AddcoponComponent } from './components/addcopon/addcopon.component';
import {  RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

const routes:Routes=[
    {path:'',component:CoponslistComponent},
    {path:'coponslist',component:CoponslistComponent},
    {path:'addcopon',component:AddcoponComponent}
]

@NgModule({
  declarations: [
    CoponslistComponent,
    AddcoponComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule
  ]
})
export class CoponsModule { }
