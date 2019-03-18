// Services
import { HttpService } from "./shared/services/http.service";
import { UserService } from "./services/user.service";

// Modules
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from "./app-routing.module";

// Components
import { AppComponent } from "./app.component";
import { LoginComponent } from "./components/login/login.component";
import { DashboardComponent } from "./containers/dashboard/dashboard.component";
import { CardComponent } from "./components/card/card.component";
import { DashboardService } from "./services/dashboard.service";
import { ButtonComponent } from "./components/Button/button.component";
import { ModalComponent } from "./components/Modal/modal.component";

const appRoutes: Routes = [
  { path: "", component: LoginComponent },
  { path: "dashboard", component: DashboardComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    CardComponent,
    ButtonComponent,
    ModalComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [UserService, HttpService, DashboardService],
  bootstrap: [AppComponent]
})
export class AppModule {}
