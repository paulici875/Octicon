import { ParkingService } from './services/parking.service';
// Services
import { UserService } from './services/user.service';
import { HttpService } from './shared/services/http.service';
import { LocalStorageService } from './services/local-storage.service';
import { DashboardService } from './services/dashboard.service';

// Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

// Components
import { AdminModalComponent } from './containers/admin-modal/admin-modal.component';
import { AppComponent } from './app.component';
import { DashboardComponent } from './containers/dashboard/dashboard.component';
import { CardComponent } from './components/card/card.component';
import { LoginComponent } from './components/login/login.component';
import { ButtonComponent } from './components/button/button.component';
import { ModalComponent } from './components/modal/modal.component';
import { BackdropComponent } from './components/UI/Backdrop/backdrop.component';
import { ProfileComponent } from './containers/profile/profile.component';

// Guards
import { AuthGuard } from './services/auth.guard';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { UserModalComponent } from './containers/user-modal/user-modal.component';
import { FastChargingParkingComponent } from './containers/fast-charging-parking/fast-charging-parking.component';
import { FastChargingParkingFormComponent } from './components/fast-charging-parking-form/fast-charging-parking-form.component';
import { NormalChargingParkingComponent } from './containers/normal-charging-parking/normal-charging-parking.component';
import { NormalChargingParkingFormComponent } from './components/normal-charging-parking-form/normal-charging-parking-form.component';
import { ReservationsModalComponent } from './containers/reservations-modal/reservations-modal.component';
import { ProfitModalComponent } from './containers/profit-modal/profit-modal.component';
import { UpdateParkingModalComponent } from './containers/update-parking-modal/update-parking-modal.component';
import { ProfitComponent } from './containers/profit/profit.component';

const appRoutes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'profit',
    component: ProfitComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    CardComponent,
    ButtonComponent,
    ModalComponent,
    BackdropComponent,
    ProfileComponent,
    AdminModalComponent,
    UserModalComponent,
    NormalChargingParkingComponent,
    NormalChargingParkingFormComponent,
    FastChargingParkingComponent,
    FastChargingParkingFormComponent,
    ReservationsModalComponent,
    ProfitModalComponent,
    UpdateParkingModalComponent,
    ProfitComponent,
  ],
  imports: [
    MaterialModule,
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MatButtonToggleModule,
    RouterModule.forRoot(appRoutes)
  ],
  entryComponents: [
    AdminModalComponent,
    UserModalComponent,
    NormalChargingParkingComponent,
    FastChargingParkingComponent,
    ReservationsModalComponent,
    ProfitModalComponent,
    UpdateParkingModalComponent
  ],
  providers: [
    UserService,
    HttpService,
    DashboardService,
    AuthGuard,
    LocalStorageService,
    ParkingService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
