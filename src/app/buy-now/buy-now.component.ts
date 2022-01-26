import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../authentication/auth.service';
import { PackageService } from '../packages/package.service';

@Component({
  selector: 'app-buy-now',
  templateUrl: './buy-now.component.html',
  styleUrls: ['./buy-now.component.css'],
  providers: [],
})
export class BuyNowComponent implements OnInit {
  constructor(
    public buynowModal: NgbActiveModal,
    public packageService: PackageService,
    public authService: AuthService,
    private toastrService: ToastrService
  ) {}
  index: number = this.packageService.index;
  isSpecialOffer: boolean = this.packageService.isSpecialOffer;

  ngOnInit(): void {}

  onPayment(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const name = form.value.name;
    const email = this.authService.user.value.email;
    if (this.isSpecialOffer) {
      this.toastrService.success(
        'Congratulations ' + name + ', you purchased a special package!',
        'Success'
      );
      this.packageService.buySpecialPackage(name, email);
    } else {
      this.toastrService.success(
        'Congratulations ' + name + ', you purchased a package!',
        'Success'
      );
      this.packageService.buyPackage(this.index, name, email);
    }
    this.buynowModal.dismiss();
  }
}
