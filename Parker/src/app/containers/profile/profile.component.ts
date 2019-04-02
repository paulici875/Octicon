import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Password } from 'src/app/models/password.model';
import { LocalStorageService } from '../../services/local-storage.service';
import { Router } from '@angular/router';
import { Profile } from '../../models/profile.model';


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
      firstName: new FormControl('',[Validators.required, Validators.maxLength(20)]),
      lastName: new FormControl('',[Validators.required, Validators.maxLength(20)]),
      email: new FormControl('',[Validators.required, Validators.email]),
      phone: new FormControl('', [Validators.required, Validators.pattern(this.phoneRegex)])
    })
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

  cancelDetailsForm(): void{
    this.updateValues();
  }

  cancelPasswordForm(): void{
    this.passwordForm.reset();
  }

  updateValues(): void{
    this.detailsForm.patchValue({
      lastName: this.currentUser.lastName,
      firstName: this.currentUser.firstName,
      phone: this.currentUser.phone,
      email: this.currentUser.email
    })
  }

  updateDetails(): void{
    this.userService.setUser(this.currentUser);
  }
  
  public detailHasError = (controlName: string, errorName: string) =>{
    return this.detailsForm.controls[controlName].hasError(errorName);
  }

  public passwordHasError = (controlName: string, errorName: string) => {
    return this.passwordForm.controls[controlName].hasError(errorName);
  }

  public updateProfile = (detailsFormValue) => {
    if (this.detailsForm.valid) {
      let profile = new Profile();
      profile = {  userId: localStorage.getItem('id'), ...detailsFormValue };
      this.userService.updateProfile(profile).subscribe(()=>{
        window.location.reload();
      })
    }
  }

  public updatePassword(value): void{
    let newPass = new Password();
    newPass.oldPassword = value.oldPassword;
    newPass.newPassword = value.newPassword;
    this.userService.setPassword(newPass).subscribe(() => {
      this.localStorageService.clearStorage();
      this.userService.setMenuState(false);
      this.router.navigate(['/login']);
    });
  }
}
