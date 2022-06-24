import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject,Observable, Subject, throwError } from 'rxjs';
import { catchError,map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { User , UserResponse} from './user';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthUserService {


  private Bool_Login = new BehaviorSubject<boolean>(this.hasToken());
  private Token_Response_OkLoggin:any;
  private loggedIn = false;

  
  constructor(private http: HttpClient, private route: Router) { }

  private hasToken(): boolean {
    return !!localStorage.getItem('Token')
  }

  isLoggedIn(): Observable<boolean>{
    return this.Bool_Login.asObservable();
  }

  login(autData:User): Observable<any>{
    return this.http.post<UserResponse>(`${environment.API_URL}/api/login/post`,autData).
    pipe(
      map(
        (res:UserResponse)=>{
          this.loggedIn = true;
          this.Bool_Login.next(this.loggedIn);
          return res;
        }),
        catchError((err)=> this.handleError(err))
    );
  }

  private handleError(err:any): Observable<never>{
    let errorMessage = 'Ha ocurrido un error.'
    if(err.error.toString()=="1900"){
      errorMessage = "Verifique su usuario y contraseña."
      Swal.fire({title: 'Error!',text: errorMessage ,icon: 'error',confirmButtonText: 'Cerrar'});
    }else{
      errorMessage = `Error : code ${err.message}`
      Swal.fire({title: 'Error!',text: errorMessage ,icon: 'error',confirmButtonText: 'Cerrar'});
    }
    
    return throwError(errorMessage);
  }

  public token(){

    const UserDataToken = {
      username:environment.USER_TOKEN,
      password:environment.PASS_TOKEN
    }
    return this.http.post<any>(`${environment.API_URL}/api/token/auth`, UserDataToken)
      .subscribe({
        next:(token:JSON) => {
        this.Token_Response_OkLoggin = token;
        const Token_Valor = this.Token_Response_OkLoggin['token'];
        localStorage.setItem('Token', Token_Valor);
        return Token_Valor;
      },
        error:(err)=>this.handleError(err)
      }
    );
  }
 
  logout(){
    this.loggedIn = false;
    this.Bool_Login.next(this.loggedIn);
    localStorage.removeItem('Token');
    this.route.navigate(["login"]);
  }
}