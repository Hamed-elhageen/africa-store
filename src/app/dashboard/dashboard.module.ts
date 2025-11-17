import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProductslistComponent } from './products/components/productslist/productslist.component';
import { DashboardheaderComponent } from './shared/dashboardheader/dashboardheader.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { DashboardlayoutComponent } from './shared/dashboardlayout/dashboardlayout.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardlayoutComponent,
    children: [
    {
        path: 'products',
        loadChildren: () =>
            import('./products/products.module').then(m => m.ProductsModule)
    },
    {
        path: 'categories',
        loadChildren: () =>
            import('./categories/categories.module').then(m => m.CategoriesModule)
    },
    {
        path: 'orders',
        loadChildren: () =>
            import('./orders/orders.module').then(m => m.OrdersModule)
    },
    {
        path: 'copons',
        loadChildren: () =>
            import('./copons/copons.module').then(m => m.CoponsModule)
    },
        {
        path: 'homecontrol',
        loadChildren: () =>
            import('./homecontrol/homecontrol.module').then(m => m.HomecontrolModule)
    },
    {
        path: '',
        redirectTo: 'products',
        pathMatch: 'full'
    }
    ]
}
];
//by this routing , inside the router outlet , each module of the products and categories will be did and inside each module you will change between add product and edit product
@NgModule({
    declarations: [
    DashboardheaderComponent,
    SidebarComponent,
    DashboardlayoutComponent
    ],
    imports: [
CommonModule,
RouterModule.forChild(routes)
    ]
})
export class DashboardModule { }
