import { LocalStorageService } from './local-storage.service';
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import {
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { Subject, Observable } from 'rxjs';

// Services
import { UserService } from './user.service';

// Models
import { User } from '../models/user.model';
import { log } from 'util';

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
    this.user = this.userService.getUser();
    if ( localStorage.getItem('id') === null || localStorage.getItem('id') === undefined) {
      this.router.navigate(['/login']);
      return false;
    } else {
      if (!this.user) {
        const subject: Subject<boolean> = new Subject<boolean>();
        const obs: Observable<boolean> = subject.asObservable();
        this.userService.getUserProfile(this.localStorageService.getLocalStorageId()).subscribe((data: User) => {
          this.userService.setUser(data);
          subject.next(true);
        });
        return obs;
      } else {
      return true;
      }
    }
  }
}
