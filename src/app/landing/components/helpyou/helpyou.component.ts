import { Component } from '@angular/core';

@Component({
  selector: 'app-helpyou',
  templateUrl: './helpyou.component.html',
  styleUrl: './helpyou.component.scss'
})
export class HelpyouComponent {
//   for going and scroll to each section when clicking on its link and make it active
currentSection!:string;
 footer:string="footer"
scrollTo(sectionId: string) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      this.currentSection = sectionId; // <<< this line is new
    }
}
}
