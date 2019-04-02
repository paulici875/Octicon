import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription, BehaviorSubject } from 'rxjs';
import { map, share } from 'rxjs/operators';

// Services
import { HttpService } from '../shared/services/http.service';

// Models
import { User } from '../models/user.model';
import { Password } from '../models/password.model';
import { Profile } from '../models/profile.model';

@Injectable()
export class UserService {
  private router: Router;
  private httpService: HttpService;
  private currentUser: User = new User();

  private showHeaderOptionsSubject = new BehaviorSubject<boolean>(false);
  public showHeaderOptionsObservable = this.showHeaderOptionsSubject.asObservable();

  constructor(httpService: HttpService, router: Router ) {
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
    return observable;
  }

  public setMenuState(state: boolean) {
    this.showHeaderOptionsSubject.next(state);
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

  public updateProfile(profile: Profile): Observable<any>{
    const observable: Observable<any> = this.httpService
      .post('/user/profile/edit', profile)
      .pipe(share());
    return observable;
  }

  public setUser(user: User): void {
    this.currentUser = user;
  }

  public setPassword(newPass: Password): Observable<any>{
    const observable: Observable<any> = this.httpService
      .post('/change-password', newPass)
      .pipe(share());
    return observable;
  }

  public setUserId(id: string): void {
    this.currentUser.id = id;
  }
}
