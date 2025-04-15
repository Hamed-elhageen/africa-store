import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  showProducts = false;
  showBranches = false;
  isMobile = window.innerWidth < 768; // Adjust breakpoint as needed

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.isMobile = event.target.innerWidth < 768; // Adjust breakpoint as needed
  }
}
