import { Component, OnInit } from "@angular/core";
import { MatDialogRef } from "@angular/material";

@Component({
  selector: "app-normal-charging-parking",
  templateUrl: "./normal-charging-parking.component.html",
  styleUrls: ["./normal-charging-parking.component.scss"]
})
export class NormalChargingParkingComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<NormalChargingParkingComponent>) {}

  ngOnInit() {}

  onClose() {
    this.dialogRef.close("close");
  }
  onSubmit(event) {
    this.dialogRef.close(event);
  }
}
