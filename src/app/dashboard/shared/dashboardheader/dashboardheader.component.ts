import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-dashboardheader',
  templateUrl: './dashboardheader.component.html',
  styleUrl: './dashboardheader.component.scss'
})
export class DashboardheaderComponent {
@Output() toggleSidebar = new EventEmitter<void>();

    onToggleSidebar() {
        this.toggleSidebar.emit();
    }
}
