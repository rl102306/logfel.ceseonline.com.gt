import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AuthUserService } from 'src/app/auth/auth-user.service';
import { PrimerIngresoService } from 'src/app/models/primer-ingreso.service';


@Component({
  selector: 'app-heaader',
  templateUrl: './heaader.component.html',
  styleUrls: ['./heaader.component.css']
})
export class HeaaderComponent implements OnInit {

  isLogged = false;
  public Bool_Existe_Empresa:any;
  public Str_Id_User:any;
  

  ngOnInit(): void {
    this.authSVC.isLoggedIn().subscribe((res) => this.isLogged = res)
  }

  mobileQuery: MediaQueryList | any;
  toggleActive = false;
 


  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private authSVC: AuthUserService,
              private PrimerIngreso: PrimerIngresoService) {
    this.mobileQuery = media.matchMedia('(max-width: 2560px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  logout(){
    this.authSVC.logout();
  }

}
