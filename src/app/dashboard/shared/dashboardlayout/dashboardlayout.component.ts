import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboardlayout',
  templateUrl: './dashboardlayout.component.html',
  styleUrl: './dashboardlayout.component.scss'
})
export class DashboardlayoutComponent {

    //those for handling the mobile side bar becuase the button to handle it is in another component which is dashbaord header and not we put this code in a parent for the 2 and the value of issidebar open will be passed to the side bar and the header will be who will send it 
isSidebarOpen = false;

    toggleSidebar() {
        this.isSidebarOpen = !this.isSidebarOpen;
    }

    closeSidebar() {
        this.isSidebarOpen = false;
    }
}
