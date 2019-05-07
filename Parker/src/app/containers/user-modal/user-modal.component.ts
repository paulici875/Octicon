import { Component, OnInit } from "@angular/core";
import { MatDialogRef } from "@angular/material";

@Component({
  selector: "app-user-modal",
  templateUrl: "./user-modal.component.html",
  styleUrls: ["./user-modal.component.scss"]
})
export class UserModalComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<UserModalComponent>) {}

  ngOnInit() {}
  onSelectOption(option) {
    this.dialogRef.close(option);
  }

  onClose(){
    this.dialogRef.close();
  }
}
