import { Component, OnInit } from "@angular/core";
import { MatDialogRef } from "@angular/material";

@Component({
  selector: "app-fast-charging-parking",
  templateUrl: "./fast-charging-parking.component.html",
  styleUrls: ["./fast-charging-parking.component.scss"]
})
export class FastChargingParkingComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<FastChargingParkingComponent>) {}

  ngOnInit() {}

  onClose() {
    this.dialogRef.close("close");
  }
  onSubmit(event) {
    this.dialogRef.close(event);
  }
}
