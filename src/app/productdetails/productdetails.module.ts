import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MainlayoutComponent } from '../shared/components/mainlayout/mainlayout.component';
import { DetaileditemComponent } from './components/detaileditem/detaileditem.component';
import { HomemainlayoutComponent } from '../shared/components/homemainlayout/homemainlayout.component';


const routes: Routes = [
  {
    path: '',
    component: HomemainlayoutComponent,
    children: [
      {
        path: 'maindetails/:prdId',
        component: DetaileditemComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [
    DetaileditemComponent,
  ],
  imports: [
  CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class ProductdetailsModule { }
