import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  private userService: UserService;
  constructor(userSevice: UserService) {
    this.userService = userSevice;
  }

  ngOnInit() {
  }
}
