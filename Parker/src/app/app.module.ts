import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login-panel/login.component';
import { DashboardComponent } from './containers/dashboard/dashboard.component';
import { CardComponent } from './components/card/card.component';
import { DashboardService } from './containers/dashboard/dashboard.service';
import { ButtonComponent } from './components/UI/Button/button.component';
import { ModalComponent } from './components/UI/Modal/modal.component';
import { BackdropComponent } from './components/UI/Backdrop/backdrop.component';

const appRoutes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    CardComponent,
    ButtonComponent,
    ModalComponent,
    BackdropComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(
      appRoutes
    ),
    HttpClientModule
  ],
  providers: [DashboardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
