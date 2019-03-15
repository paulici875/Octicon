import { Component, Input, HostListener } from '@angular/core';

@Component({
  selector: 'card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})

export class CardComponent {
  @Input() address: string;
  @Input() emptySpotsCount: number;
}
