import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { ForgotpasswordComponent } from './components/forgotpassword/forgotpassword.component';


const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent ,
  },
  {
    path: 'register',
    component:RegisterComponent ,
  },
  {
    path: 'forgotpassword',
    component:ForgotpasswordComponent ,
  }
];
@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ForgotpasswordComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class AuthModule { }
