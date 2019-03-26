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

  private currentUser: User = new User();

  constructor(httpService: HttpService, router: Router) {
    this.httpService = httpService;
    this.router = router;
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
          console.log('User Type:', userRecived);
          this.currentUser.type = userRecived.userType;
          this.currentUser.id = userRecived.userId;
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

  public logOut(): Observable<any> {
    const observable: Observable<any> = this.httpService
      .post('/logout')
      .pipe(share());
    return observable;
  }

  public getUserProfile(): Observable<any> {
    return this.httpService.get('/user/profile').pipe(share());
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
