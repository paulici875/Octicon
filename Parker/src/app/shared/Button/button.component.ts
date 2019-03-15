import { Component, Input } from '@angular/core';

@Component({
  selector: 'buttoncmp',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})

export class ButtonComponent {
  @Input() image: string;
  @Input() text: string;
}
