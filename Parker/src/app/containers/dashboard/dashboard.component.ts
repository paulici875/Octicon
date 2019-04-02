import { UserService } from "./../../services/user.service";
import { Component, OnInit } from "@angular/core";
import { DashboardService } from "../../services/dashboard.service";
import { MatDialog } from "@angular/material";
import { AdminModalComponent } from "../admin-modal/admin-modal.component";
import { UserModalComponent } from "../user-modal/user-modal.component";
import { FastChargingParkingComponent } from "../fast-charging-parking/fast-charging-parking.component";
import { NormalChargingParkingComponent } from "../normal-charging-parking/normal-charging-parking.component";
import { ReservationsModalComponent } from "../reservations-modal/reservations-modal.component";
import { ProfitModalComponent } from "../profit-modal/profit-modal.component";
import { UpdateParkingModalComponent } from "../update-parking-modal/update-parking-modal.component";
import { UserType } from "src/app/models/type.enums";

@Component({
  selector: "dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"]
})
export class DashboardComponent implements OnInit {
  public parkings = [];
  public showModal = false;

  private userSevice: UserService;

  constructor(private dashboardService: DashboardService, userService: UserService, public dialog: MatDialog) {
    this.userSevice = userService;
  }

  ngOnInit() {
    this.dashboardService.getParkings().subscribe(data => {
      this.parkings = data;
    });

    this.userSevice.setMenuState(true);
  }

  openModal(modal, minWidth = "500px") {
    return this.dialog.open(modal, {
      minWidth: minWidth,
      autoFocus: false,
      panelClass: "modal"
    });
  }

  openAdminModal() {
    this.openModal(AdminModalComponent)
      .afterClosed()
      .subscribe(result => {
        if (result === "reservations") {
          this.openModal(ReservationsModalComponent);
        }
        if (result === "profit") {
          this.openModal(ProfitModalComponent);
        }
        if (result === "update") {
          this.openModal(UpdateParkingModalComponent);
        }
      });
  }

  openUserModal() {
    this.openModal(UserModalComponent)
      .afterClosed()
      .subscribe(result => {
        if (result === "normalParking") {
          this.openModal(NormalChargingParkingComponent)
            .afterClosed()
            .subscribe(result => {
              if (result === "close") {
                this.openUserModal();
              }
            });
        }
        if (result === "electricalParking") {
          this.openModal(FastChargingParkingComponent)
            .afterClosed()
            .subscribe(result => {
              if (result === "close") {
                this.openUserModal();
              }
            });
        }
      });
  }

  onOpenReservationModal(event) {
    if (event === UserType.ADMIN) {
      this.openAdminModal();
    } else {
      this.openUserModal();
    }
  }
}
