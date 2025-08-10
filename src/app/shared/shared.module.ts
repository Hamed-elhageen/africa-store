import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainlayoutComponent } from './components/mainlayout/mainlayout.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { RouterModule, Routes } from '@angular/router';
import { MainlandingComponent } from '../landing/components/mainlanding/mainlanding.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomemainlayoutComponent } from './components/homemainlayout/homemainlayout.component';
import { CardComponent } from './components/card/card.component';
import { NotfoundComponent } from './components/notfound/notfound.component';


@NgModule({
  declarations: [MainlayoutComponent, HeaderComponent, FooterComponent, NavbarComponent, HomemainlayoutComponent, CardComponent, NotfoundComponent],
  imports: [CommonModule, RouterModule],
  exports: [HeaderComponent, FooterComponent, MainlayoutComponent,CardComponent],
})
export class SharedModule {}
