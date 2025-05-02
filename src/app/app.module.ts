import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainlandingComponent } from './landing/components/mainlanding/mainlanding.component';
import { SharedModule } from './shared/shared.module';
import { LandingModule } from './landing/landing.module';
import { HttpClientModule } from '@angular/common/http';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule,HttpClientModule ,NgxSpinnerModule,BrowserAnimationsModule],
providers: [provideClientHydration()],
  bootstrap: [AppComponent],
})
export class AppModule {}
