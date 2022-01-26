import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/authentication/auth.service';
import { LoginComponent } from 'src/app/authentication/login/login.component';
import { BuyNowComponent } from 'src/app/buy-now/buy-now.component';
import { DeleteConfirmationComponent } from '../delete-confirmation/delete-confirmation.component';
import { EditPackageComponent } from '../edit-package/edit-package.component';

import { Package } from '../package.model';
import { PackageService } from '../package.service';
@Component({
  selector: 'app-package-item',
  templateUrl: './package-item.component.html',
  styleUrls: ['./package-item.component.css'],
})
export class PackageItemComponent implements OnInit {
  @Input() pack: Package;
  @Input() index: number;

  @Input() admin: boolean;
  @Input() isAuthenticated: boolean;

  @Input() component: string;

  constructor(
    private packageService: PackageService,
    private modalService: NgbModal
  ) {}
  public email: string;
  public name: string;

  ngOnInit(): void {
    this.email = this.packageService.getBuyerEmail(this.index);
    this.name = this.packageService.getBuyerName(this.index);
  }

  openBuyNowModal() {
    this.packageService.index = this.index;
    if (this.isAuthenticated) {
      this.modalService.open(BuyNowComponent);
    } else {
      this.modalService.open(LoginComponent);
    }
  }

  openDeleteConfirmationModal() {
    this.packageService.index = this.index;
    this.modalService.open(DeleteConfirmationComponent);
  }

  onEditPackage() {
    this.packageService.index = this.index;
    this.modalService.open(EditPackageComponent);
  }
}
