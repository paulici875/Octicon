import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from './services/user.service';
import { LocalStorageService } from './services/local-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  private router: Router;
  private userService: UserService;
  private localStorageService: LocalStorageService;

  public showIcons = false;

  constructor(
    router: Router,
    userService: UserService,
    localStorageService: LocalStorageService
  ) {
    this.router = router;
    this.userService = userService;
    this.localStorageService = localStorageService;
  }

  ngOnInit(): void {
    this.userService.showHeaderOptionsObservable.subscribe((state: boolean) => {
      setTimeout(() => {
        this.showIcons = state;
      });
    });
  }

  public logOut() {
    this.localStorageService.clearStorage();
    this.userService.setMenuState(false);
    this.router.navigate(['/login']);
  }
}
