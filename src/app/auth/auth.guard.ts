import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { map, take, tap } from "rxjs/operators";
import { AuthService } from "./auth.service";

@Injectable({ providedIn: 'root'})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ){}

   canActivate(
    _route: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.user.pipe(
      take(1),
      map(user => {
        // return !!user;
        const isAuth = !!user;
        if (isAuth) {
          return isAuth;
        }
        return this.router.createUrlTree(['/auth']);
      },
      // funciona porém oferece condição de concorrência
      /*tap((isAuth) => {
        if (!isAuth) {
          this.router.navigate(['/auth']);
        }
      })*/
    ));
  }
}
