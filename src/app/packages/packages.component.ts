import * as $ from 'jquery';

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

  // index = 1;
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

    // if ($(window).innerWidth() <= 575) {
    //   $('li:has(a.active)').css('order', '1');
    // }
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
  index_africa = 0;
  index_namerica = 0;
  index_samerica = 0;
  index_asia = 0;
  index_australia = 0;
  index_antartica = 0;
  index_europa = 1;
  index_max = 1;
  orderChange(continent: string) {
    switch (continent) {
      case 'africa':
        this.index_max++;
        this.index_africa = this.index_max;
        break;
      case 'namerica':
        this.index_max++;
        this.index_namerica = this.index_max;
        break;
      case 'samerica':
        this.index_max++;
        this.index_samerica = this.index_max;
        break;
      case 'asia':
        this.index_max++;
        this.index_asia = this.index_max;
        break;
      case 'australia':
        this.index_max++;
        this.index_australia = this.index_max;
        break;
      case 'antartica':
        this.index_max++;
        this.index_antartica = this.index_max;
        break;
      case 'europa':
        this.index_max++;
        this.index_europa = this.index_max;
        break;
    }
  }
}

// var index = 1;
// $(function () {
//   if ($(window).innerWidth() <= 575) {
//     {
//       $('ul.nav li').on('click', function () {
//         index = index + 1;
//         $('li:has(a.active)').css('order', index);
//       });
//     }
//   }
// });

// var index = 1;
// $(function () {
//   if ($(window).innerWidth() <= 575) {
//     {
//       $('ul.nav li').on('click', function () {
//         $('ul li a').each(function () {
//           if ($(this).hasClass('active')) {
//             index = index + 1;
//             $(this).parent().css('order', index);
//           }
//         });
//       });
//     }
//   }
// });
