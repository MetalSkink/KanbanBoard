import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from '../services/token.service';

@Injectable({
  providedIn: 'root'
})
export class ProdGuardGuard implements CanActivate {

  realRol: string;

  constructor(
    private tokenService:TokenService,
    private router: Router
  ){}

  canActivate(
    route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
      const expectedRol = route.data.expectedRol;
      const roles = this.tokenService.getAuthorities();
      this.realRol = 'user';
      roles.forEach(rol =>{
        if(rol === 'ROLE_ADMIN'){
          this.realRol = 'admin';
        }
      });
      if (!this.tokenService.getToken() || expectedRol.indexOf(this.realRol) === -1){
        this.router.navigate(['/']);
        console.log(this.realRol);
        console.log("nel");

        return false;
      }
      console.log(this.realRol);
      console.log("pasale");
      return true;
  }

}
