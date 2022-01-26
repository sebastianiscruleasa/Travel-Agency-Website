import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { exhaustMap, take, tap } from 'rxjs/operators';
import { AuthService } from '../authentication/auth.service';

import { Package } from './package.model';
@Injectable({
  providedIn: 'root',
})
export class PackageService {
  isSpecialOffer: boolean = false;
  specialPackage: Package;
  index: number;
  packagesChanged = new Subject<Package[]>();
  specialPackageChanged = new Subject<Package>();
  private packages: Package[] = [];
  constructor(private http: HttpClient, private authService: AuthService) {}

  getPackages() {
    this.packages = this.packages || [];
    return this.packages.slice();
  }

  getPackage(index: number) {
    return this.packages[index];
  }

  getSpecialPackage() {
    return this.specialPackage;
  }

  setPackages(packages: Package[]) {
    this.packages = packages || [];
    this.packagesChanged.next(this.packages.slice());
  }
  setSpecialPackage(pack: Package) {
    this.specialPackage = pack;
    this.specialPackageChanged.next(this.specialPackage);
  }

  getIndex() {
    return this.index;
  }

  addPackage(pack: Package) {
    this.packages.push(pack);
    this.packagesChanged.next(this.packages.slice());
    this.storePackages();
  }

  deletePackage(index: number) {
    this.packages.splice(index, 1);
    this.packagesChanged.next(this.packages.slice());
    this.storePackages();
  }

  buyPackage(index: number, buyerName: string, buyerEmail: string) {
    this.packages[index].buyerEmail = buyerEmail;
    this.packages[index].buyerName = buyerName;
    this.packagesChanged.next(this.packages.slice());
    this.storePackages();
  }

  buySpecialPackage(buyerName: string, buyerEmail: string) {
    this.fetchSpecialPackage();
    this.specialPackage.sold = 1;
    this.specialPackage.buyerName = buyerName;
    this.specialPackage.buyerEmail = buyerEmail;
    this.addPackage(this.specialPackage);
    this.updateSpecialPackage(this.specialPackage);
  }

  getBuyerEmail(index: number) {
    return this.packages[index].buyerEmail;
  }

  getBuyerName(index: number) {
    return this.packages[index].buyerName;
  }

  updatePackage(index: number, newPackage: Package) {
    newPackage.buyerEmail = '';
    newPackage.buyerName = '';
    this.packages[index] = newPackage;
    this.packagesChanged.next(this.packages.slice());
    this.storePackages();
    this.isSpecialOffer = false;
  }

  updateSpecialPackage(newSpecialPackage: Package) {
    newSpecialPackage.buyerEmail = '';
    newSpecialPackage.buyerName = '';
    this.specialPackage = newSpecialPackage;
    this.specialPackageChanged.next(this.specialPackage);
    this.http
      .put(
        'https://travel-agency-f2741-default-rtdb.firebaseio.com/special-package.json',
        this.specialPackage
      )
      .subscribe((response) => {
        console.log(response);
      });
    this.isSpecialOffer = false;
  }

  storePackages() {
    this.http
      .put(
        'https://travel-agency-f2741-default-rtdb.firebaseio.com/packages.json',
        this.packages
      )
      .subscribe((response) => {
        console.log(response);
      });
  }

  fetchPackages() {
    return this.authService.user.pipe(
      take(1),
      exhaustMap((user) => {
        const params = user?.token
          ? new HttpParams().set('auth', user.token)
          : null;
        return this.http.get<Package[]>(
          'https://travel-agency-f2741-default-rtdb.firebaseio.com/packages.json',
          {
            params,
          }
        );
      }),
      tap((packages: Package[]) => {
        this.setPackages(packages);
      })
    );
  }

  fetchSpecialPackage() {
    return this.authService.user.pipe(
      take(1),
      exhaustMap((user) => {
        const params = user?.token
          ? new HttpParams().set('auth', user.token)
          : null;
        return this.http.get<Package>(
          'https://travel-agency-f2741-default-rtdb.firebaseio.com/special-package.json',
          {
            params,
          }
        );
      }),
      tap((pack: Package) => {
        this.setSpecialPackage(pack);
      })
    );
  }
}
