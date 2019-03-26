import { LocalStorageService } from './local-storage.service';
import { BackEndUser } from './../models/backEndUser.model';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { map, share } from 'rxjs/operators';

// Services
import { HttpService } from '../shared/services/http.service';

// Models
import { User } from '../models/user.model';

@Injectable()
export class UserService {
  private router: Router;
  private httpService: HttpService;
  private localStorageService: LocalStorageService;

  private currentUser: User = new User();

  constructor(httpService: HttpService, router: Router , localStorageService: LocalStorageService) {
    this.httpService = httpService;
    this.router = router;
    this.localStorageService = localStorageService;
  }

  /**
   * Request login
   */
  public login(user: User): Observable<any> {
    const observable: Observable<any> = this.httpService
      .post('/login', user)
      .pipe(share());
    const subscription: Subscription = observable.subscribe(
      (userRecived: BackEndUser) => {
        if (userRecived) {
          const id = userRecived.userId;

          this.getUserProfile(userRecived.userId).subscribe((finalUser: User) => {
            this.currentUser = finalUser;
            this.currentUser.id = String(id);
            console.log(this.currentUser);
            this.localStorageService.setLocalStorageId(this.currentUser.id);
          });

        }
        setTimeout(() => {
          subscription.unsubscribe();
        });
      },
      () => {
        subscription.unsubscribe();
      }
    );
    return observable;
  }


  public getUserProfile(userId): Observable<any> {
    return this.httpService.get(`/user/profile/${userId}`).pipe(share());
  }

  public setCurrentUserType(type: string): void {
    this.currentUser.type = type;
  }

  public getCurrentUserType(): string {
    return this.currentUser.type;
  }

  public getUser(): User {
    return this.currentUser;
  }

  public setUser(user: User): void {
    this.currentUser = user;
  }
}
