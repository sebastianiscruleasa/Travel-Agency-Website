import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SlideshowComponent } from './slideshow/slideshow.component';
import { PackagesComponent } from './packages/packages.component';
import { SpecialOfferComponent } from './special-offer/special-offer.component';
import { SignupComponent } from './authentication/signup/signup.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './authentication/login/login.component';
import { BuyNowComponent } from './buy-now/buy-now.component';
import { PackageItemComponent } from './packages/package-item/package-item.component';
import { AddPackageComponent } from './packages/add-package/add-package.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditPackageComponent } from './packages/edit-package/edit-package.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { CookieService } from 'ngx-cookie-service';
import { MyTripsComponent } from './my-trips/my-trips.component';
import { OrdersComponent } from './orders/orders.component';
import { FooterComponent } from './footer/footer.component';
import { DeleteConfirmationComponent } from './packages/delete-confirmation/delete-confirmation.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RichTextEditorAllModule } from '@syncfusion/ej2-angular-richtexteditor';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SlideshowComponent,
    PackagesComponent,
    SpecialOfferComponent,
    SignupComponent,
    LoginComponent,
    BuyNowComponent,
    PackageItemComponent,
    AddPackageComponent,
    EditPackageComponent,
    LoadingSpinnerComponent,
    MyTripsComponent,
    OrdersComponent,
    FooterComponent,
    DeleteConfirmationComponent,
  ],
  imports: [
    BrowserModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    RichTextEditorAllModule,
  ],
  providers: [CookieService],
  bootstrap: [AppComponent],
})
export class AppModule {}
