import { Component, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../authentication/auth.service';
import { LoginComponent } from '../authentication/login/login.component';
import { MyTripsComponent } from '../my-trips/my-trips.component';
import { OrdersComponent } from '../orders/orders.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  @Input() isAuthenticated: boolean;
  @Input() admin: boolean;

  constructor(
    private modalService: NgbModal,
    private authService: AuthService
  ) {}

  openMyTripsModal() {
    this.modalService.open(MyTripsComponent, { size: <any>'xl' });
  }

  openOrdersModal() {
    this.modalService.open(OrdersComponent, { size: <any>'xl' });
  }

  openLoginModal() {
    this.modalService.open(LoginComponent);
  }

  onLogout() {
    this.admin = false;
    this.authService.logout();
  }
}
