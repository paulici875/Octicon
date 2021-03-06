// Services
import { UserService } from "./services/user.service";
import { HttpService } from "./shared/services/http.service";
import { LocalStorageService } from "./services/local-storage.service";
import { DashboardService } from "./services/dashboard.service";

// Modules
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from "./app-routing.module";

// Components
import { AdminModalComponent } from "./containers/admin-modal/admin-modal.component";
import { AppComponent } from "./app.component";
import { DashboardComponent } from "./containers/dashboard/dashboard.component";
import { CardComponent } from "./components/card/card.component";
import { LoginComponent } from "./components/login/login.component";
import { ButtonComponent } from "./components/button/button.component";
import { ModalComponent } from "./components/modal/modal.component";
import { BackdropComponent } from "./components/UI/Backdrop/backdrop.component";
import { ProfileComponent } from "./containers/profile/profile.component";

// Guards
import { AuthGuard } from "./services/auth.guard";

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MaterialModule } from "./material.module";
import { UserModalComponent } from "./containers/user-modal/user-modal.component";

const appRoutes: Routes = [
  {
    path: "",
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "**",
    redirectTo: ""
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
    UserModalComponent
  ],
  imports: [
    MaterialModule,
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes)
  ],
  entryComponents: [AdminModalComponent, UserModalComponent],
  providers: [UserService, HttpService, DashboardService, AuthGuard, LocalStorageService],
  bootstrap: [AppComponent]
})
export class AppModule {}
