import { Component, OnInit } from "@angular/core";
import { MatDialogRef } from "@angular/material";

@Component({
  selector: "app-admin-modal",
  templateUrl: "./admin-modal.component.html",
  styleUrls: ["./admin-modal.component.scss"]
})
export class AdminModalComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<AdminModalComponent>) {}

  ngOnInit() {}
  onClose() {
    this.dialogRef.close("close");
  }
  selectOption(option) {
    this.dialogRef.close(option);
  }
  goToProfit(){
    window.location.assign('http://localhost:4200/profit');
  }
}
