import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainlandingComponent } from './components/mainlanding/mainlanding.component';
import { RouterModule, Routes } from '@angular/router';
import { MainlayoutComponent } from '../shared/components/mainlayout/mainlayout.component';
import { FirstlandingComponent } from './components/firstlanding/firstlanding.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { ChooseComponent } from './components/choose/choose.component';
import { HelpyouComponent } from './components/helpyou/helpyou.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/mainlanding',
    pathMatch: 'full',
  },
  {
    path: '',
    component: MainlayoutComponent,
    children: [
      {
        path: 'mainlanding',
        component: MainlandingComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [MainlandingComponent, FirstlandingComponent, CategoriesComponent, ChooseComponent, HelpyouComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [CategoriesComponent]

})
export class LandingModule {}
