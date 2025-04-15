import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaincategoriesComponent } from './components/maincategories/maincategories.component';
import { RouterModule, Routes } from '@angular/router';
import { HomemainlayoutComponent } from '../shared/components/homemainlayout/homemainlayout.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';



const routes: Routes = [
  {
    path: '',
    redirectTo: '/maincategories',
    pathMatch: 'full',
  },
  {
    path: '',
    component: HomemainlayoutComponent,
    children: [
      {
        path: 'maincategories',
        component: MaincategoriesComponent,
      },
    ],
  },
];
@NgModule({
  declarations: [
    MaincategoriesComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    FormsModule,
  ]
})
export class AllcategoriesModule { }
