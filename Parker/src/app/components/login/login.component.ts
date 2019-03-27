import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';

// Services
import { LocalStorageService } from './../../services/local-storage.service';
import { UserService } from 'src/app/services/user.service';

// Models
import { User } from 'src/app/models/user.model';
import { BackEndUser } from 'src/app/models/backEndUser.model';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  private router: Router;
  private userService: UserService;
  private validateSubscription: Subscription;
  private localStorageService: LocalStorageService;

  public loginForm: FormGroup;
  public newUser: User = new User();

  constructor(userService: UserService, router: Router, localStorageService: LocalStorageService) {
    this.userService = userService;
    this.router = router;
    this.localStorageService = localStorageService;
    this.loginForm = new FormGroup({
      email: new FormControl(this.newUser.email, [Validators.required]),
      password: new FormControl(this.newUser.password, [Validators.required])
    });
  }

  ngOnInit() {
    if (localStorage.getItem('id')) {
      this.router.navigate(['']);
    }
  }

  public onSubmit(): void {
    this.newUser.email = this.loginForm.get(['email']).value;
    this.newUser.password = this.loginForm.get(['password']).value;

    this.login();
  }

  private login(): void {
    this.validateSubscription = this.userService
      .login(this.newUser)
      .subscribe((userRecived: BackEndUser) => {
        if (userRecived) {
          const id = String(userRecived.userId);
          this.userService.getUserProfile(userRecived.userId).subscribe((finalUser: User) => {
            this.userService.setUser(finalUser);
            this.userService.setUserId(id);
            this.localStorageService.setLocalStorageId(id);
            this.router.navigate(['']);
          });

        }
      });
  }
}
