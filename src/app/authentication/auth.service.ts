import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { catchError, map, tap } from 'rxjs/operators';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { User } from './user.model';
import { CookieService } from 'ngx-cookie-service';

interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user = new BehaviorSubject<User>(null);

  constructor(private http: HttpClient, private cookieService: CookieService) {}

  private handleAuthentication(
    email: string,
    userId: string,
    token: string,
    expiresIn: number
  ) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, userId, token, expirationDate);
    this.cookieService.set('user', JSON.stringify(user));
    this.user.next(user);
  }

  private handleError(errorResponse: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (!errorResponse.error || !errorResponse.error.error) {
      return throwError(errorMessage);
    }

    switch (errorResponse.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email already exists!';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'The email address or password is incorrect!';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'The email address or password is incorrect!';
        break;
    }
    return throwError(errorMessage);
  }

  signup(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCGZSdU4h9TZd6DFbPKLJcRxC59vjEvPb0',
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.handleError),
        tap((responseData) => {
          this.handleAuthentication(
            responseData.email,
            responseData.localId,
            responseData.idToken,
            +responseData.expiresIn
          );
        })
      );
  }

  login(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCGZSdU4h9TZd6DFbPKLJcRxC59vjEvPb0',
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.handleError),
        tap((responseData) => {
          this.handleAuthentication(
            responseData.email,
            responseData.localId,
            responseData.idToken,
            +responseData.expiresIn
          );
        })
      );
  }
  logout() {
    this.user.next(null);
    this.cookieService.delete('user');
  }

  updateCurrentUser() {
    if (this.cookieService.check('user')) {
      const user = JSON.parse(this.cookieService.get('user'));
      this.user.next(user);
    }
  }

  isAuthenticated(): Observable<boolean> {
    return this.user.pipe(map((user) => (!user ? false : true)));
  }

  isAdmin(): Observable<boolean> {
    return this.user.pipe(
      map((user) =>
        user && user.email == 'admin@travel.agency.com' ? true : false
      )
    );
  }
}
