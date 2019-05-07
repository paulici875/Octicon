import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AdminModalComponent } from '../admin-modal/admin-modal.component';
import { UserModalComponent } from '../user-modal/user-modal.component';
import { FastChargingParkingComponent } from '../fast-charging-parking/fast-charging-parking.component';
import { NormalChargingParkingComponent } from '../normal-charging-parking/normal-charging-parking.component';
import { ReservationsModalComponent } from '../reservations-modal/reservations-modal.component';
import { ProfitModalComponent } from '../profit-modal/profit-modal.component';
import { UpdateParkingModalComponent } from '../update-parking-modal/update-parking-modal.component';
import { UserType } from 'src/app/models/type.enums';
import { Router } from '@angular/router';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public parkings = [];
  private router: Router;
  public showModal = false;
  public userType: string;
  private userSevice: UserService;

  constructor(
    private dashboardService: DashboardService,
    userService: UserService,
    public dialog: MatDialog,
    router: Router
  ) {
    this.userSevice = userService;
    this.router = router;
  }

  ngOnInit() {
    this.dashboardService.getParkings().subscribe(data => {
      this.parkings = data;
    });

    this.userType = this.userSevice.getCurrentUserType();
    this.userSevice.setMenuState(true);
  }

  openModal(modal,dataRecived?, type?, minWidth = '500px') {
    return this.dialog.open(modal, {
      minWidth,
      autoFocus: false,
      panelClass: 'modal',
      data: {
        item: dataRecived,
        typeModal: type
      }
    });
  }

  openAdminModal() {
    this.openModal(AdminModalComponent)
      .afterClosed()
      .subscribe(result => {
        if (result === 'reservations') {
          this.openModal(ReservationsModalComponent);
        }
        if (result === 'profit') {
          this.openModal(ProfitModalComponent);
        }
        if (result === 'update') {
          this.openModal(UpdateParkingModalComponent);
        }
      });
  }

  openUserModal(data) {
    this.openModal(UserModalComponent)
      .afterClosed()
      .subscribe(result => {
        // if (result === 'normalParking') {
        this.openModal(NormalChargingParkingComponent, data , result)
          .afterClosed()
          .subscribe(result => {
            if (result === 'close') {
              this.openUserModal(data);
            }
        });
        // }
        // if (result === 'electricalParking') {
        //   this.openModal(FastChargingParkingComponent, data)
        //     .afterClosed()
        //     .subscribe((result: any) => {
        //       if (result === 'close') {
        //         this.openUserModal(data);
        //       }
        //     });
        // }
      });
  }

  onOpenReservationModal(event, parking) {
    if (event === UserType.ADMIN) {
      this.openAdminModal();
    } else {
      this.openUserModal(parking);
    }
  }
}
