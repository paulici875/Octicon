import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Subject } from 'rxjs';

// Services
import { UserService } from './user.service';

// Models
import { User } from './../models & enums/user.model';

@Injectable()
export class AuthGuard implements CanActivate {
  private userService: UserService;
  private user: User;
  private router: Router;

  constructor(userService: UserService, router: Router) {
    this.userService = userService;
    this.router = router;
  }

  canActivate() {
    console.log('CAN ACTIVATE');
    this.user = this.userService.getUser();
    if (!localStorage.getItem('userToken')) {
      console.log('AICICIC');
      this.router.navigate(['login']);
      return false;
    }
    return true;
    // if (this.user === undefined) {
    //   if (localStorage.getItem('userToken') === undefined) {
    //     this.router.navigate(['/login']);
    //     return false;
    //   } else {
    //     return true;
    //   }
    // } else {
    //     this.router.navigate(['dashboard']);
    //     return true;
    // }
  }
}
