import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./components/login/login-panel/login.component";
import { DashboardComponent } from "./containers/dashboard/dashboard.component";
import { CardComponent } from "./components/card/card.component";
import { DashboardService } from "./services/dashboard.service";
import { ButtonComponent } from "./shared/Button/button.component";
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
  imports: [BrowserModule, AppRoutingModule, RouterModule.forRoot(appRoutes), HttpClientModule],
  providers: [DashboardService],
  bootstrap: [AppComponent]
})
export class AppModule {}
