import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainfavoritesComponent } from './components/mainfavorites/mainfavorites.component';
import { RouterModule, Routes } from '@angular/router';
import { HomemainlayoutComponent } from '../shared/components/homemainlayout/homemainlayout.component';
import { SharedModule } from '../shared/shared.module';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/mainfavorites',
    pathMatch: 'full',
  },
  {
    path: '',
    component: HomemainlayoutComponent,
    children: [
      {
        path: 'mainfavorites',
        component: MainfavoritesComponent,
      },
    ],
  },
];
@NgModule({
  declarations: [
    MainfavoritesComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class FavoritesModule { }
