import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { PackageService } from '../package.service';

@Component({
  selector: 'app-delete-confirmation',
  templateUrl: './delete-confirmation.component.html',
  styleUrls: ['./delete-confirmation.component.css'],
})
export class DeleteConfirmationComponent implements OnInit {
  constructor(
    public deleteConfirmationModal: NgbActiveModal,
    public packagesService: PackageService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {}

  deletePackage() {
    const index = this.packagesService.index;
    const city = this.packagesService.getPackage(index).city;
    this.packagesService.deletePackage(index);
    this.deleteConfirmationModal.dismiss();
    this.toastrService.error(
      'The ' + city + ' package was successfully deleted!',
      'Delete'
    );
  }
}
