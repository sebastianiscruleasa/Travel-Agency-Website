import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';

import { Package } from './package.model';
import { PackageService } from './package.service';
import { AddPackageComponent } from './add-package/add-package.component';
import { BuyNowComponent } from '../buy-now/buy-now.component';

@Component({
  selector: 'app-packages',
  templateUrl: './packages.component.html',
  styleUrls: ['./packages.component.css'],
})
export class PackagesComponent implements OnInit, OnDestroy {
  constructor(
    private modalService: NgbModal,
    private packageService: PackageService
  ) {}

  @Input() isAuthenticated: boolean;
  @Input() admin: boolean;

  isLoading: boolean = false;
  packages: Package[] = [];
  subscription: Subscription;

  ngOnInit() {
    this.isLoading = true;
    this.packageService.fetchPackages().subscribe();
    this.subscription = this.packageService.packagesChanged.subscribe(
      (packages: Package[]) => {
        this.packages = packages;
        this.isLoading = false;
      }
    );
  }

  openBuyNowModal() {
    this.modalService.open(BuyNowComponent);
  }

  openAddPackageModal() {
    this.modalService.open(AddPackageComponent);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
