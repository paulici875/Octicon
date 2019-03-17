import { Component, Input, HostListener, Output } from '@angular/core';
import { EventEmitter } from 'protractor';

@Component({
  selector: 'modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})

export class ModalComponent {
  @Input() show: boolean;

  closeModal() {
    this.show = !this.show;
  }
}
