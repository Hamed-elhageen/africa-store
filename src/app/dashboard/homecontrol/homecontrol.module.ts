import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomecontrolComponent } from './components/homecontrol/homecontrol.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

const routes: Routes = [
  { path: '', component: HomecontrolComponent },
  { path: 'homecontrol', component: HomecontrolComponent },
];

@NgModule({
  declarations: [
    HomecontrolComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    FormsModule,
    ReactiveFormsModule
]
})
export class HomecontrolModule { }
