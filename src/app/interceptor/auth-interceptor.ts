import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {NavigationExtras, Router} from "@angular/router";
import {catchError, map, Observable, throwError} from "rxjs";
import {Injectable} from "@angular/core";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
// Forward people back to login in case of invalid token
  constructor(private router: Router) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(req).pipe(
      map((event: HttpEvent<any>) => event),
      catchError((error: HttpErrorResponse) => {
        if (error && error.status == 401) {
          localStorage.removeItem('jwt');
          const navigationExtras: NavigationExtras = {state: {data: 'Token invalid or not available'}};
          this.router.navigate([""], navigationExtras);
        }
        return throwError(() => error)
      })
    );
  }
}
