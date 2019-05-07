import { Parking } from 'src/app/models/parking.model';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-normal-charging-parking',
  templateUrl: './normal-charging-parking.component.html',
  styleUrls: ['./normal-charging-parking.component.scss']
})
export class NormalChargingParkingComponent implements OnInit {
  public parking: Parking;
  public parkingType: string;

  constructor(
    public dialogRef: MatDialogRef<NormalChargingParkingComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
      this.parking = data.item;
      this.parkingType = data.typeModal;
  }

  ngOnInit() {}

  onClose() {
    this.dialogRef.close('close');
  }
  onSubmit(event) {
    this.dialogRef.close(event);
  }
}
