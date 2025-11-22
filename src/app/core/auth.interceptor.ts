import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
// this is the interceptor that sees all the requests sent to the server , and if the token expired it will take the user to the login page
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {

        // لو السيرفر قال إن الـ token بايظة
        if (error.status === 401) {

          // امسح التوكن
          localStorage.removeItem('token');

          // ودي المستخدم على صفحة اللوجين
          this.router.navigate(['/authentication/login']);

          // OPTIONAL: ممكن تعمل toast message
          // this.toastr.error("Session expired, please login again");
        }

        return throwError(() => error);
      })
    );
  }
}
