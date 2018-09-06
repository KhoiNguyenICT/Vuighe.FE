import { AuthService } from './core/services/auth.service'
import { Injectable, Injector } from '@angular/core'
import { CanActivate } from '@angular/router'
import { map } from 'rxjs/operators'
import { Observable } from 'rxjs'
import { ApiConfig } from './core/services/api-config';

@Injectable({
  providedIn: 'root'
})
export class AppGuard implements CanActivate {

  loginRoot: string

  constructor(
    injector: Injector,
    private authService: AuthService
  ) {
    this.loginRoot = injector.get<ApiConfig>(ApiConfig).loginRoot
  }

  canActivate(): Observable<boolean> {
    return this.authService.isActiveRouter().pipe(
      map(value => {
        if (value) { return true } else { window.location.href =  this.loginRoot}
      })
    )
  }
}
