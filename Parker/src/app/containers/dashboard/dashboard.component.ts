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

  constructor(private dashboardService: DashboardService) {}

  ngOnInit() {
    this.dashboardService.getParkings().subscribe(data => {
      console.log(data);
    });
  }
}
