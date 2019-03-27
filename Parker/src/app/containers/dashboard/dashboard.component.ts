import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public parkings = [];
  public showModal = false;

  private userSevice: UserService;

  constructor(private dashboardService: DashboardService, userService: UserService) {
    this.userSevice = userService;
  }

  ngOnInit() {
    this.dashboardService.getParkings().subscribe(data => {
      this.parkings = data;
    });

    this.userSevice.setMenuState(true);
  }
}
