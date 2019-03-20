import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  private router: Router;

  public token = false;

  constructor(router: Router) {
    this.router = router;
  }

  ngOnInit(): void {
  }

  public logOut() {
    localStorage.clear();
    this.router.navigate(['login']);
  }
}
