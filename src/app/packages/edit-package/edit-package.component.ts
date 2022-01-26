import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Package } from '../package.model';
import { PackageService } from '../package.service';

@Component({
  selector: 'app-edit-package',
  templateUrl: './edit-package.component.html',
  styleUrls: ['./edit-package.component.css'],
})
export class EditPackageComponent implements OnInit, OnDestroy {
  constructor(
    public editPackageModal: NgbActiveModal,
    public packageService: PackageService,
    private http: HttpClient,
    private toastrService: ToastrService
  ) {}
  specialPackage: Package;
  isSpecialOffer: boolean = this.packageService.isSpecialOffer;
  index: number = this.packageService.index;
  pack: Package;
  packageForm: FormGroup;

  ngOnInit(): void {
    this.initForm();
  }

  getSpecialForm() {
    this.http
      .get<Package>(
        'https://travel-agency-f2741-default-rtdb.firebaseio.com/special-package.json'
      )
      .subscribe((response: Package) => {
        this.pack = response;
        this.packageForm = new FormGroup({
          image: new FormControl(this.pack.image),
          continent: new FormControl(this.pack.continent),
          city: new FormControl(this.pack.city),
          price: new FormControl(this.pack.price),
          period: new FormControl(this.pack.period),
          hotel: new FormControl(this.pack.hotel),
          people: new FormControl(this.pack.people),
          food: new FormControl(this.pack.food),

          oldPrice: new FormControl(this.pack.oldPrice),
          description: new FormControl(this.pack.description),
          sold: new FormControl(this.pack.sold),
        });
      });
  }

  getForm() {
    this.pack = this.packageService.getPackage(this.index);

    this.packageForm = new FormGroup({
      image: new FormControl(this.pack.image),
      continent: new FormControl(this.pack.continent),
      city: new FormControl(this.pack.city),
      price: new FormControl(this.pack.price),
      period: new FormControl(this.pack.period),
      hotel: new FormControl(this.pack.hotel),
      people: new FormControl(this.pack.people),
      food: new FormControl(this.pack.food),
    });
  }

  initForm() {
    if (this.packageService.isSpecialOffer) {
      this.getSpecialForm();
    } else {
      this.getForm();
    }
  }

  onSavePackage() {
    if (this.isSpecialOffer) {
      this.toastrService.info(
        'The ' +
          this.packageForm.value.city +
          ' special package has been edited!',
        'Changes saved'
      );
      this.packageForm.value.sold = 0;
      this.packageService.updateSpecialPackage(this.packageForm.value);
    } else {
      this.toastrService.info(
        'The ' + this.packageForm.value.city + ' package has been edited!',
        'Changes saved'
      );
      this.packageService.updatePackage(this.index, this.packageForm.value);
    }
    this.editPackageModal.dismiss();
  }

  ngOnDestroy() {
    this.packageService.isSpecialOffer = false;
  }
}
