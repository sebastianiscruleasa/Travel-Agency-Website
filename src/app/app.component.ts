import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from './authentication/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  public title = 'TravelAgency';

  public isAuthenticated$: Observable<boolean>;
  public isAdmin$: Observable<boolean>;
  constructor(public authService: AuthService) {
    authService.updateCurrentUser();
    this.isAuthenticated$ = this.authService.isAuthenticated();
    this.isAdmin$ = this.authService.isAdmin();
  }
}
