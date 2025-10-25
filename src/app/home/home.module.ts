import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainhomeComponent } from './components/mainhome/mainhome.component';
import { RouterModule, Routes } from '@angular/router';
import { HomemainlayoutComponent } from '../shared/components/homemainlayout/homemainlayout.component';
import { FirsthomeComponent } from './components/firsthome/firsthome.component';
import { LandingModule } from '../landing/landing.module';
import { SharedModule } from '../shared/shared.module';
import { FootballShoesComponent } from './components/someProducts/someProducts';

import { CardComponent } from '../shared/components/card/card.component';
import { CategoryProductsComponent } from './components/category-products/category-products.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/mainhome',
    pathMatch: 'full',
  },
  {
    path: '',
    component: HomemainlayoutComponent,
    children: [
      {
        path: 'mainhome',
        component: MainhomeComponent,
      },
      {
        path: 'categoryproducts/:catId',
        component:CategoryProductsComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [
    MainhomeComponent,
    FirsthomeComponent,
    FootballShoesComponent,

    CategoryProductsComponent,
  ],
  imports: [
    CommonModule,RouterModule.forChild(routes),
    LandingModule,SharedModule
  ],
})
export class HomeModule { }
