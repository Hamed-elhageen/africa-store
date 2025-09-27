import { Component } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError, Event as RouterEvent } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'] // ✅ لازم تبقى styleUrls مش styleUrl
})
export class AppComponent {
  title = 'Africa stores';


  //for adding spinner animation on each click to route
  constructor(private router: Router, private spinner: NgxSpinnerService) {
    this.router.events.subscribe((event: RouterEvent) => {
      if (event instanceof NavigationStart) {
        this.spinner.show();
      }
      if (event instanceof NavigationEnd || event instanceof NavigationCancel || event instanceof NavigationError) {
        this.spinner.hide();
      }
    });
  }
}
