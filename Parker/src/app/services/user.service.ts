import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, Subscription } from "rxjs";
import { map, share } from "rxjs/operators";

// Services
<<<<<<< HEAD:Parker/src/app/services/user.service.ts
import { HttpService } from '../shared/services/http.service';

// Models
import { User } from '../models/user.model';
=======
import { HttpService } from "../shared/services/http.service";

// Models
import { User } from "../models/user.model";
>>>>>>> 47682b38204edacfea9c8c08a65816668c7a2a57:Parker/src/app/services/user.service.ts

@Injectable()
export class UserService {
  private router: Router;
  private httpService: HttpService;

<<<<<<< HEAD:Parker/src/app/services/user.service.ts
  private currentUser: User;
=======
  public currentUser: User;
>>>>>>> 47682b38204edacfea9c8c08a65816668c7a2a57:Parker/src/app/services/user.service.ts

  constructor(httpService: HttpService, router: Router) {
    this.httpService = httpService;
    this.router = router;
  }

  /**
   * Request login
   */
  public login(user: User): Observable<any> {
<<<<<<< HEAD:Parker/src/app/services/user.service.ts
    const observable: Observable<any> = this.httpService
      .post('/login', user)
      .pipe(share());
=======
    const observable: Observable<any> = this.httpService.post("/login", user).pipe(share());
>>>>>>> 47682b38204edacfea9c8c08a65816668c7a2a57:Parker/src/app/services/user.service.ts
    const subscription: Subscription = observable.subscribe(
      (userRecived: User) => {
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
