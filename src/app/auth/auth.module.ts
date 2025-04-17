import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { ForgotpasswordComponent } from './components/forgotpassword/forgotpassword.component';
import { UpdatepasswordComponent } from './components/updatepassword/updatepassword.component';
import { VerificationComponent } from './components/verification/verification.component';
import { SuccessComponent } from './components/success/success.component';


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
  },
  {
    path: 'updatepassword',
    component:UpdatepasswordComponent ,
  },
  {
    path: 'verification',
    component:VerificationComponent ,
  },
  {
    path: 'success',
    component:SuccessComponent ,
  }
];
@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ForgotpasswordComponent,
    UpdatepasswordComponent,
    VerificationComponent,
    SuccessComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class AuthModule { }
