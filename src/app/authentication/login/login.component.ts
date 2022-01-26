import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../auth.service';
import { SignupComponent } from '../signup/signup.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  isLoading: boolean = false;
  error: string = null;
  constructor(
    public loginModal: NgbActiveModal,
    private modalService: NgbModal,
    private authService: AuthService
  ) {}

  ngOnInit(): void {}

  openSignupModal() {
    this.modalService.open(SignupComponent);
    this.loginModal.dismiss();
  }

  onLogin(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;
    this.isLoading = true;
    this.authService.login(email, password).subscribe(
      (response) => {
        console.log(response);
        this.isLoading = false;
        this.loginModal.dismiss();
      },
      (errorMessage) => {
        console.log(errorMessage);
        this.error = errorMessage;

        this.isLoading = false;
      }
    );
    form.reset();
  }
}
