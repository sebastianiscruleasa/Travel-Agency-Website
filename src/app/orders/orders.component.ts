import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { Package } from '../packages/package.model';
import { PackageService } from '../packages/package.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit {
  constructor(
    public ordersModal: NgbActiveModal,
    public packageService: PackageService
  ) {}

  isLoading: boolean = false;
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
