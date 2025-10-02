import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { BaseOptions } from 'vm';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {

@Input() isSidebarOpen:boolean=false



@Output() close = new EventEmitter<void>();

    onClose() {
        this.close.emit();
    }

}
