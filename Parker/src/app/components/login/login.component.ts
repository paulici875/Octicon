import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { FormControl, FormGroup, Validators } from "@angular/forms";

// Services
import { UserService } from "../../services/user.service";

// Models
import { BackEndUser } from "./../../models/backEndUser.model";
import { User } from "./../../models/user.model";

@Component({
  selector: "login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
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
    this.newUser.email = this.loginForm.get(["email"]).value;
    this.newUser.password = this.loginForm.get(["password"]).value;

    this.login();
  }

  private login(): void {
    this.validateSubscription = this.userService.login(this.newUser).subscribe((data: BackEndUser) => {
      if (data) {
        localStorage.setItem("userToken", data.uniqueToken);
        this.userService.setCurrentUserType(data.userType);
      } else {
        console.log("There is no such user");
      }
    });
  }
}
