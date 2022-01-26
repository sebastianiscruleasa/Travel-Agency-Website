import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

import { Package } from '../package.model';
import { PackageService } from '../package.service';

@Component({
  selector: 'app-add-package',
  templateUrl: './add-package.component.html',
  styleUrls: ['./add-package.component.css'],
})
export class AddPackageComponent implements OnInit {
  constructor(
    public addPackageModal: NgbActiveModal,
    public packageService: PackageService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {}
  onAddPackage(form: NgForm) {
    const value = form.value;
    const pack = new Package(
      value.image,
      value.continent,
      value.city,
      value.price,
      value.period,
      value.hotel,
      value.people,
      value.food
    );
    this.packageService.addPackage(pack);
    this.addPackageModal.dismiss();
    this.toastrService.success(
      'The ' + value.city + ' package was successfully added!',
      'Package added'
    );
  }
}
