import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { LoginComponent } from '../authentication/login/login.component';
import { BuyNowComponent } from '../buy-now/buy-now.component';
import { EditPackageComponent } from '../packages/edit-package/edit-package.component';
import { Package } from '../packages/package.model';
import { PackageService } from '../packages/package.service';

@Component({
  selector: 'app-special-offer',
  templateUrl: './special-offer.component.html',
  styleUrls: ['./special-offer.component.css'],
})
export class SpecialOfferComponent implements OnInit {
  constructor(
    private modalService: NgbModal,
    private packageService: PackageService
  ) {}

  @Input() isAuthenticated: boolean;
  @Input() admin: boolean;
  specialPackage: Package;
  subscription: Subscription;

  ngOnInit(): void {
    this.packageService.fetchSpecialPackage().subscribe();
    this.subscription = this.packageService.specialPackageChanged.subscribe(
      (pack: Package) => {
        this.specialPackage = pack;
      }
    );
  }

  openBuyNowModal() {
    if (this.isAuthenticated) {
      this.packageService.isSpecialOffer = true;
      this.modalService.open(BuyNowComponent);
    } else {
      this.modalService.open(LoginComponent);
    }
  }

  onEditPackage() {
    this.packageService.isSpecialOffer = true;
    this.modalService.open(EditPackageComponent);
  }
}
