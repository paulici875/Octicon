import { UserService } from "./../../services/user.service";
import { Component, OnInit } from "@angular/core";
import { DashboardService } from "../../services/dashboard.service";
import { MatDialog } from "@angular/material";
import { AdminModalComponent } from "../admin-modal/admin-modal.component";
import { UserModalComponent } from "../user-modal/user-modal.component";
import { Router } from '@angular/router';

@Component({
  selector: "dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"]
})
export class DashboardComponent implements OnInit {
  public parkings = [];
  private router: Router;
  public showModal = false;
  private userSevice: UserService;

  constructor(router: Router, private dashboardService: DashboardService, userService: UserService, public dialog: MatDialog, ) {
    this.userSevice = userService;
    this.router = router;
  }

  ngOnInit() {
    this.dashboardService.getParkings().subscribe(data => {
      this.parkings = data;
    });

    this.userSevice.setMenuState(true);
  }

  onOpenReservationModal(event) {
    console.log(event);
    if (event === "Admin") {
      const dialogAdminRef = this.dialog
        .open(AdminModalComponent, {
          minWidth: "500px",
          autoFocus: false,
          panelClass: "modal"
        })
        .afterClosed()
        .subscribe(result => {
          this.router.navigate(['/'+result]);
        });
    } else {
      const dialogUserRef = this.dialog
        .open(UserModalComponent, {
          minWidth: "500px",
          autoFocus: false,
          panelClass: "modal"
        })
        .afterClosed()
        .subscribe(result => {
          console.log(result);
        });
    }
  }
}
