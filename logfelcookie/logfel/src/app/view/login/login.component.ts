import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthUserService } from 'src/app/auth/auth-user.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { PrimerIngresoService } from 'src/app/models/primer-ingreso.service';
import { SuscripcionComponent } from '../suscripcion/suscripcion.component';
import { SuscripcionService } from 'src/app/models/suscripcion.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  public Form_Login: any;
  public hide = true;
  private token: any;
  private Str_User_Obj: any;
  private Str_User_Id: any;
  private isLoggedIn: Observable<boolean> | any;

  constructor(private Form_Builder_Login: FormBuilder, private authUserService: AuthUserService,
    private router: Router, private PrimerIngreso: PrimerIngresoService, private Sus_Existe: SuscripcionService) {
    this.isLoggedIn = authUserService.isLoggedIn();
    this.authUserService.logout();
  }

  ngOnInit(): void {

    this.Form_Login = this.Form_Builder_Login.group({
      user: ['', [Validators.required]],
      pass: ['', [Validators.required]]
    })

  }
  onSubmitLogin() 
  {
    const UserData = {
      username: this.Form_Login.get('user').value,
      password: this.Form_Login.get('pass').value
    }

    this.authUserService.login(UserData).subscribe(
      (res) => {
        if (res) {
          this.Str_User_Obj = res;
          const Str_User_Id = this.Str_User_Obj['userId'];
          this.authUserService.token()
          localStorage.setItem('User_Id', Str_User_Id);
          const Json_User_Param = {
            usuario: Str_User_Id,
          }

          this.Sus_Existe.Existe_Suscripcion(Json_User_Param).subscribe({

            next: (res: any) => {

              if (res.Existe == true) {

                this.Sus_Existe.Estado_Suscripcion(Json_User_Param).subscribe({

                  next: (res: any) => {

                    if (res.Estado == true) {

                      this.PrimerIngreso.Obtener_Empresa(Json_User_Param).subscribe({
                        
                        next: (res: any) => {
                        
                          if (res.Existe == true) {
                            Swal.fire(
                              {
                                title: 'Bienvenido!',
                                text: 'Gracias por volver',
                                icon: 'success',
                                confirmButtonText: 'Cerrar'
                              }
                            );
                            this.router.navigate(["ucf"]);
                          } 
                          else 
                          {
                            
                            Swal.fire({
                                title: 'Oops...',
                                text: 'Debes registrar una empresa.',
                                icon: 'success',
                                confirmButtonText: 'Cerrar'
                            });
                            
                              this.router.navigate(["empresa"]);
                          }
                        },
                        error: (err) => {
                          
                          Swal.fire({ 
                            title: 'Oops... ', 
                            text: '¡Algo salió mal!, por favor intenta de nuevo.' + err, 
                            icon: 'error', 
                            confirmButtonText: 'Cerrar' 
                          });
                        }

                    })

                    } else {

                      console.log("Ocurrio un error ")
                      console.log(res)
                      Swal.fire({
                        title: 'Oops...',
                        text: '¡Tu suscripcion ha vencido!. Si ya haz renovado recuerda que debes enviarnos la boleta de pago a info@ceseonline.com.gt',
                        icon: 'error',
                        confirmButtonText: 'Cerrar'
                      });

                    
                    this.router.navigate(["renovar-suscripcion"]);
                    }
                  },
                  error: (err) => {
                    console.log("Error de Django 5")
                    Swal.fire({ title: 'Oops... 5', text: '¡Algo salió mal!, por favor intenta de nuevo.' + err, icon: 'error', confirmButtonText: 'Cerrar' });
                  }
                })

              
              } 
              else 
              {
                Swal.fire(
                  {
                    title: 'Bienvenido!',
                    text: 'Debes elegir un plan.',
                    icon: 'success',
                    confirmButtonText: 'Cerrar'
                  }
                );
                this.router.navigate(["suscripcion"]);
              }
            },
            error: (err) => {
              Swal.fire({
                title: 'Oops... 6',
                text: '¡Algo salió mal!, por favor intenta de nuevo.' + err,
                icon: 'error',
                confirmButtonText: 'Cerrar'
              });
            }
          })

        }
      },
      (err) => {
        localStorage.removeItem('Token');
      }
    );
  }
}