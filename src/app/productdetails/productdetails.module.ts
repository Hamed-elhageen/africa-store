import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MainlayoutComponent } from '../shared/components/mainlayout/mainlayout.component';
import { DetaileditemComponent } from './components/detaileditem/detaileditem.component';
import { MaindetailsComponent } from './components/maindetails/maindetails.component';
import { HomemainlayoutComponent } from '../shared/components/homemainlayout/homemainlayout.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/maindetails/:id',
    pathMatch: 'full',
  },
  {
    path: '',
    component: HomemainlayoutComponent,
    children: [
      {
        path: 'maindetails/:id',
        component: MaindetailsComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [
    DetaileditemComponent,
    MaindetailsComponent
  ],
  imports: [
  CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class ProductdetailsModule { }
