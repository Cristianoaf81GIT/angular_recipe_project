import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, tap } from "rxjs/operators";
import {
  Observable,
  throwError,
  OperatorFunction,
  ObservedValueOf,
  // Subject,
  BehaviorSubject
} from 'rxjs';
import { environment } from "../../environments/environment.development"
import { User } from "./user.model";
import { Router } from "@angular/router";


export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: BehaviorSubject<User> = new BehaviorSubject(null);

  private tokenExpirationTimer: any;

  constructor(private http: HttpClient, private router: Router) {}

  signup(email: string, password: string) {
    return this.http.post<AuthResponseData>(environment.signUpUrl, {
      email,
      password,
      returnSecureToken: true
    }).pipe(
        catchError(this.errorHandler),
        tap((res) => {
          this.handleAuthentication(
            res.email,
            res.localId,
            res.idToken,
            +res.expiresIn
          );
        })
      );
  }

  private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
    const expDate = new Date(
      new Date().getTime() +
      expiresIn *
      1000
    );
    const usr = new User(
      email,
      userId,
      token,
      expDate
    );
    this.user.next(usr);
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(usr));
  }

  login(email: string, password: string) {
    return this.http.post<AuthResponseData>(environment.signInUrl,{
      email,
      password,
      returnSecureToken: true
    }).pipe(
        catchError(this.errorHandler),
         tap((res) => {
          this.handleAuthentication(
            res.email,
            res.localId,
            res.idToken,
            +res.expiresIn
          );
        })
      );
  }

  autoLogin() {
    const userData: {
      email: string,
      id: string,
      _token: string,
      _tokenExpirationDate: string
    } = JSON.parse(localStorage.getItem('userData'));

    if (!userData) {
      return;
    }
    const loadedUser = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );

    if (loadedUser.token) {
      const expirationDuration = new Date(
        userData._tokenExpirationDate).getTime()
        - new Date().getTime();
      this.autoLogout(expirationDuration);
      this.user.next(loadedUser);
    }
  }

  logout() {
    localStorage.removeItem('userData');
    this.user.next(null);
    this.router.navigate(['/auth']);
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  private errorHandler(err: any, _caught: Observable<any>): OperatorFunction<any, any | ObservedValueOf<any>> | Observable<never> {
      let errorMessage = 'An unknown error occurred!';

      if (!err.error || !err.error.error) {
        return throwError(errorMessage);
      }

      switch(err.error.error.message) {
        case 'EMAIL_NOT_FOUND':
          errorMessage = 'Email not found!';
          break;
        case 'INVALID_PASSWORD':
          errorMessage = 'Invalid Password!';
          break;
        case 'USER_DISABLED':
          errorMessage = 'The user account has been disabled by an administrator!';
          break;
        case 'EMAIL_EXISTS':
          errorMessage = 'Email already exists!';
          break;
        case 'OPERATION_NOT_ALLOWED':
          errorMessage = 'Password sign-in is disabled for this project!';
          break;
        case 'TOO_MANY_ATTEMPTS_TRY_LATER':
          errorMessage = 'We have blocked all requests from this device due to unusual activity. Try again later!';
          break;
        default:
          break;
      }
    return throwError(errorMessage);
  }
}
