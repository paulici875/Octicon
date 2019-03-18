import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { map, share } from 'rxjs/operators';

// Services
import { HttpService } from './../../shared/services/http.service';

// Models
import { User } from '../models & enums/user.model';

@Injectable()
export class UserService {
  private router: Router;
  private httpService: HttpService;

  private currentUser: User;


  constructor(httpService: HttpService, router: Router) {
    this.httpService = httpService;
    this.router = router;
  }

  /**
   * Request login
   */
  public login(user: User): Observable<any> {
    const observable: Observable<any> = this.httpService.post('/login', user).pipe(share());
    const subscription: Subscription = observable.subscribe((userRecived: User) => {
        if (user) {
          this.currentUser = user;
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
