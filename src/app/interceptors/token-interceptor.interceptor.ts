import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptorInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
      const token = localStorage.getItem('LoggedInToken');
      // console.log('Token:', token);
      if (token) {
        req = req.clone({ 
          setHeaders: { 
            'Authorization': `Bearer ${token}` ,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          } 
        });
      } else {
        this.router.navigate(['/auth/login']);
      }
    return next.handle(req);
  }
}
