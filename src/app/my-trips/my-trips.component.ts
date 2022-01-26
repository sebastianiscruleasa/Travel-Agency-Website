import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { AuthService } from '../authentication/auth.service';
import { Package } from '../packages/package.model';
import { PackageService } from '../packages/package.service';

@Component({
  selector: 'app-my-trips',
  templateUrl: './my-trips.component.html',
  styleUrls: ['./my-trips.component.css'],
})
export class MyTripsComponent implements OnInit {
  constructor(
    public myTripsModal: NgbActiveModal,
    public authService: AuthService,
    public packageService: PackageService
  ) {}

  isLoading: boolean = false;
  email = this.authService.user.value.email;
  packages: Package[];
  subscription: Subscription;

  ngOnInit(): void {
    this.isLoading = true;
    this.packageService.fetchPackages().subscribe();
    this.subscription = this.packageService.packagesChanged.subscribe(
      (packages: Package[]) => {
        this.packages = packages;
        this.isLoading = false;
      }
    );
  }
}
