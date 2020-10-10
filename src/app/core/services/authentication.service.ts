import { Reader } from './../models/reader/reader';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Constants } from 'src/app/shared/constants';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private currentUserSubject: BehaviorSubject<Reader>;
  public currentUser: Observable<Reader>;
  constants: Constants = new Constants();

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<Reader>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
      }

    public get currentUserValue(): Reader {
        return this.currentUserSubject.value;
    }

    verifyEmail(email: string) {
      const headers = new HttpHeaders();
      const params = new HttpParams().set('email', email);
      headers.append('Content-Type', 'application/json');
      return this.http.get<any>(this.constants.url + '/ReaderApi/VerifyEmail' , {
        headers, params
      });
    }

    addReader(reader: Reader) {
        return this.http.post<Reader>( this.constants.url + `/ReaderApi/AddReader`, reader);
    }

    verifyOtp(reader: Reader) {
      return this.http.post<Reader>(this.constants.url + '/ReaderApi/VerifyOtp', reader)
        .pipe(map(user => {
          if (user.Token !== null) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.currentUserSubject.next(user);
            return user;
          }
        }));
    }

    login(reader: Reader) {
      return this.http.post<Reader>(this.constants.url + '/ReaderApi/Login', reader)
        .pipe(map(user => {
          if (user.Token !== null) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.currentUserSubject.next(user);
            return user;
          }
        }), catchError( error => {
          return throwError('Something went wrong');
        }));
    }

    forgotPassword(reader: Reader) {
      return this.http.post<Reader>( this.constants.url + `/ReaderApi/ForgotPassword`, reader);
    }

    verifyForgotPwdOtp(reader: Reader) {
      return this.http.post<boolean>( this.constants.url + `/ReaderApi/VerifyForgotPwdOtp`, reader);
    }

    changePassword(reader: Reader) {
      return this.http.post<Reader>(this.constants.url + '/ReaderApi/ChangePassword', reader)
        .pipe(map(user => {
          if (user.Token !== null) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.currentUserSubject.next(user);
            return user;
          }
        }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
}
