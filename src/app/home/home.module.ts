import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainhomeComponent } from './components/mainhome/mainhome.component';
import { RouterModule, Routes } from '@angular/router';
import { HomemainlayoutComponent } from '../shared/components/homemainlayout/homemainlayout.component';
import { FirsthomeComponent } from './components/firsthome/firsthome.component';
import { LandingModule } from '../landing/landing.module';
import { TshirtsComponent } from './components/tshirts/tshirts.component';
import { SharedModule } from '../shared/shared.module';
import { FootballShoesComponent } from './components/football-shoes/football-shoes.component';
import { SportsShoesComponent } from './components/sports-shoes/sports-shoes.component';
import { SportsTshirtsComponent } from './components/sports-tshirts/sports-tshirts.component';
import { SportsAccessoriesComponent } from './components/sports-accessories/sports-accessories.component';
import { SportsBagsComponent } from './components/sports-bags/sports-bags.component';
import { CardComponent } from '../shared/components/card/card.component';

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
    ],
  },
];

@NgModule({
  declarations: [
    MainhomeComponent,
    FirsthomeComponent,
    TshirtsComponent,
    FootballShoesComponent,
    SportsShoesComponent,
    SportsTshirtsComponent,
    SportsAccessoriesComponent,
    SportsBagsComponent,
  ],
  imports: [
    CommonModule,RouterModule.forChild(routes),
    LandingModule,SharedModule
  ],
})
export class HomeModule { }
