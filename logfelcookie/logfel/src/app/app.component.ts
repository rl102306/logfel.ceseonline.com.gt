import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthUserService } from 'src/app/auth/auth-user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent 
{
  //private isLoggedIn: Observable<boolean> | any;
  title = 'LoGFeL';

  constructor( private authSVC: AuthUserService ) { 
    //this.isLoggedIn = authSVC.isLoggedIn();
  }

  ngOnInit(): void {
   //this.authSVC.logout();
  }

}
