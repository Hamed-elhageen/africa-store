import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaincartComponent } from './components/maincart/maincart.component';
import { RouterModule, Routes } from '@angular/router';
import { HomemainlayoutComponent } from '../shared/components/homemainlayout/homemainlayout.component';
import { CartitemComponent } from './components/cartitem/cartitem.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/maincart',
    pathMatch: 'full',
  },
  {
    path: '',
    component: HomemainlayoutComponent,
    children: [
      {
        path: 'maincart',
        component: MaincartComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [
    MaincartComponent,
    CartitemComponent
  ],
  imports: [
    CommonModule,RouterModule.forChild(routes)
  ]
})
export class CartModule { }
