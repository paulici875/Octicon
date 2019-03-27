import { LocalStorageService } from './local-storage.service';
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import {
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { Subject } from 'rxjs';

// Services
import { UserService } from './user.service';

// Models
import { User } from '../models/user.model';

@Injectable()
export class AuthGuard implements CanActivate {
  private userService: UserService;
  private user: User;
  private router: Router;
  private localStorageService: LocalStorageService;

  constructor(
    userService: UserService,
    router: Router,
    localStorageService: LocalStorageService
  ) {
    this.userService = userService;
    this.router = router;
    this.localStorageService = localStorageService;
  }

  canActivate() {
    console.log('CAN ACTIVATE');
    this.user = this.userService.getUser();
    console.log('USER', this.user);
    if ( localStorage.getItem('id') === null || localStorage.getItem('id') === undefined) {
      this.router.navigate(['/login']);
      return false;
    } else {
      return true;
    }
  }
}
