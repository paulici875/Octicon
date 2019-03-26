import { UserService } from './services/user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  private router: Router;
  private userService: UserService;

  public token = false;

  constructor(router: Router, userService: UserService) {
    this.router = router;
    this.userService = userService;
  }

  ngOnInit(): void {

  }

  public logOut() {
    this.userService.getUserProfile().subscribe(( data) => {
      console.log('USER PROFILE:', data);
      this.userService.logOut().subscribe(() => {
        this.router.navigate(['login']);
      });
    });

  }
}
