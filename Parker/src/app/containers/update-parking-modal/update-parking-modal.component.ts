import { Parking } from 'src/app/models/parking.model';
import { ParkingService } from './../../services/parking.service';
import { Component, OnInit, Inject, ChangeDetectionStrategy } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-update-parking-modal',
  templateUrl: './update-parking-modal.component.html',
  styleUrls: ['./update-parking-modal.component.scss']
})
export class UpdateParkingModalComponent implements OnInit {
  public id: any;
  public parking: Parking;
  color = 'accent';
  checked: boolean;
  constructor(
    private parkingService: ParkingService,
    public dialogRef: MatDialogRef<UpdateParkingModalComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
      this.parking = data.item;
      this.id = data.item.id;
      this.checked = data.item.isOpen;
      console.log('CONSTRUCTOR');
  }

  ngOnInit() {

  }

  toggle(event) {
    this.parkingService.toggleParking(this.id).subscribe((data) => {
      this.parking.isOpen = this.checked;
      this.parkingService.sendCheck(this.parking);

    });
  }
}
