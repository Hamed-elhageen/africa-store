import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotfoundComponent } from './shared/components/notfound/notfound.component';
import { ifloginGuard } from './auth/guards/iflogin.guard';
import { ifadminGuard } from './auth/guards/ifadmin.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/mainlanding',
    pathMatch: 'full',
  },
  {
    path: '',
    loadChildren: () =>
      import('../app/landing/landing.module').then((m) => m.LandingModule),
  },
  {
    path: 'home',
    loadChildren: () =>
      import('../app/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'shared',
    loadChildren: () =>
      import('../app/shared/shared.module').then((m) => m.SharedModule),
  },
  {
    path: 'cart',
    canActivate:[ifloginGuard],
    // the guard to check if the user is loggen in or not , if the user wasnt logged , it wont open to him the cart
    loadChildren: () =>
      import('../app/cart/cart.module').then((m) => m.CartModule),
  },
  {
    path: 'favorites',
    canActivate:[ifloginGuard],
    loadChildren: () =>
      import('../app/favorites/favorites.module').then((m) => m.FavoritesModule),
  },
  {
    path: 'details',
    loadChildren: () =>
      import('../app/productdetails/productdetails.module').then((m) => m.ProductdetailsModule),
  },
  {
    path: 'allcategories',
    loadChildren: () =>
      import('../app/allcategories/allcategories.module').then((m) => m.AllcategoriesModule),
  },
  {
    path: 'authentication',
    loadChildren: () =>
      import('../app/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'dashboard',
      canActivate: [ifadminGuard],
    loadChildren: () =>
      import('../app/dashboard/dashboard.module').then((m) => m.DashboardModule),
  },

    {path:"**" , component:NotfoundComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes ,{
    scrollPositionRestoration: 'enabled' // <-- يجيبك فوق الصفحة
    })],           // the second param with routes , means if you were in the bottom of a page and clicks on a link to another page , if this wasnt added , the new page will be opened in the bottom in the place you were in , but by this after each going to new page it goes to above
  exports: [RouterModule],
})
export class AppRoutingModule {}
