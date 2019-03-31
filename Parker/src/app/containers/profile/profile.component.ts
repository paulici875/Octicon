import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Password } from 'src/app/models/password.model';
import { LocalStorageService } from '../../services/local-storage.service';
import { Router } from '@angular/router';
import { fdatasync } from 'fs';


@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit {
  private router: Router;
  private localStorageService: LocalStorageService;

  private userService: UserService;
  public currentUser: User = new User();
  public detailsForm: FormGroup;
  public numberOfActiveReservations: boolean = false;
  public passwordForm: FormGroup;
  constructor(router: Router, userService: UserService, localStorageService: LocalStorageService) {
    this.userService = userService;
    this.router = router;
    this.localStorageService = localStorageService;
    this.detailsForm = new FormGroup({
      lastName: new FormControl(this.currentUser ? this.currentUser.lastName : '', {validators: [Validators.required], updateOn: 'submit'}),
      firstName: new FormControl(this.currentUser ? this.currentUser.firstName : '', {validators: [Validators.required], updateOn: 'submit'}),
      email: new FormControl(this.currentUser ? this.currentUser.email: '', {validators: [Validators.required], updateOn: 'submit'}),
      phone: new FormControl(this.currentUser ? this.currentUser.phone: '', {validators: [Validators.required], updateOn: 'submit'})
  });
  this.passwordForm = new FormGroup({
    oldPassword: new FormControl('', [Validators.required]),
    newPassword: new FormControl('', [Validators.required])
  })
}


  ngOnInit() {
    this.userService.getUserProfile(localStorage.id).subscribe((data)=> {
      if(data.numberOfActiveReservations === 1){
        this.numberOfActiveReservations = true;
      }

      this.currentUser = data;
      this.updateValues();
    });
  }

  updateValues(): void{
    this.detailsForm.setValue({
      lastName: this.currentUser.lastName,
      firstName: this.currentUser.firstName,
      phone: this.currentUser.phone,
      email: this.currentUser.email
    })
  }

  onDetailsSubmit(): void {
    this.currentUser.firstName = this.detailsForm.get('firstName').value;
    this.currentUser.lastName = this.detailsForm.get('lastName').value;
    this.currentUser.email = this.detailsForm.get('email').value;
    this.currentUser.phone = this.detailsForm.get('phone').value;

    this.updateDetails();
  }

  onPasswordSubmit(): void{
    let newPass = new Password();
    newPass.oldPassword = this.passwordForm.get('oldPassword').value,
    newPass.newPassword = this.passwordForm.get('newPassword').value
    this.userService.setPassword(newPass).subscribe(() => {
      this.localStorageService.clearStorage();
      this.userService.setMenuState(false);
      this.router.navigate(['/login']);
    });
  }

  clearDetailsForm(): void{
    this.detailsForm.reset();
  }

  clearPasswordForm(): void{
    this.passwordForm.reset();
  }

  updateDetails(): void{
    this.userService.setUser(this.currentUser);
  }
  
}
