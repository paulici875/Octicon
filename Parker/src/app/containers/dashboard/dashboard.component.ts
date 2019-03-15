import { Component, OnInit, Output } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';
import { EventEmitter } from 'protractor';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public parkings = [];
  public showModal = false;

  constructor(private dashboardService: DashboardService) { }

  ngOnInit() {
    this.dashboardService.getParkings()
          .subscribe(data => this.parkings = data );
  }

}
