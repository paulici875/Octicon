import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';

// Services
import { UserService } from './../../../user/services/user.service';

// Models
import { BackEndUser } from './../../../user/models & enums/backEndUser.model';
import { User } from './../../../user/models & enums/user.model';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  private router: Router;
  private userService: UserService;
  private validateSubscription: Subscription;

  public loginForm: FormGroup;
  public newUser: User = new User();

  constructor(userService: UserService, router: Router) {
    this.userService = userService;
    this.router = router;
    this.loginForm = new FormGroup({
      email: new FormControl(this.newUser.email, [Validators.required]),
      password: new FormControl(this.newUser.password, [Validators.required])
    });
  }

  ngOnInit() {}

  public onSubmit(): void {
    this.newUser.email = this.loginForm.get(['email']).value;
    this.newUser.password = this.loginForm.get(['password']).value;

    this.login();
  }

  private login(): void {
    this.validateSubscription = this.userService
      .login(this.newUser)
      .subscribe((data: BackEndUser) => {
        if (data) {
          if (data.uniqueToken != null) {
            localStorage.setItem('userToken', data.uniqueToken)
            this.userService.setCurrentUserType(data.userType);
            this.router.navigate(['']);
          } else {
            console.log('There is no such user');
          }
        } else {
          console.log('Error');
        }
      });
  }
}
