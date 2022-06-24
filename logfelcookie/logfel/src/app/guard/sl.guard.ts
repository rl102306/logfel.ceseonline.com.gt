import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { map, Observable, take } from 'rxjs';
import { AuthUserService } from '../auth/auth-user.service';

@Injectable({
  providedIn: 'root'
})
export class SlGuard implements CanActivate {
  verq:any;
  constructor(private authService: AuthUserService ) {
  }

  canActivate():Observable<boolean>{
    
    return this.authService.isLoggedIn().pipe(
      take(1),
      map((IsLogged:boolean)=>!IsLogged));
  }
  
}
