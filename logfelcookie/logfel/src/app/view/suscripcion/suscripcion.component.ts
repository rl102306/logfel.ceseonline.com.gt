import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { EbipayService } from 'src/app/models/ebipay.service';
import Swal from 'sweetalert2';
import { catchError, map, Observable } from 'rxjs';
import { SuscripcionService } from 'src/app/models/suscripcion.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-suscripcion',
  templateUrl: './suscripcion.component.html',
  styleUrls: ['./suscripcion.component.css']
})
export class SuscripcionComponent implements OnInit {

  private Token_Ebi_Pay: any;
  private CodRedSocial_Ebi_Pay: any;
  private CodRedSocialGet: any;
  private Fecha_Actual: any;
  private Fecha_Actual_Format_OK: any;
  breakpoint: any;

  constructor(
    private http: HttpClient,
    private EbiPay: EbipayService,
    private Sus_Registrar: SuscripcionService,
    private datePipe: DatePipe,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.breakpoint = (window.innerWidth <= 800) ? 1 : 2;
    //this.LoginEBI();
  }

  onResize(event: any) {
    this.breakpoint = (event.target.innerWidth <= 800) ? 1 : 2;
  }


  public LoginEBI() {

    const Form_Data = new FormData();
    Form_Data.append('llave', '24dd6249787d91870bf89b36fae4307bcbd21226');
    Form_Data.append('usuario', 'ronaldolara58@gmail.com');
    Form_Data.append('clave', 'Cese2023$$')

    this.EbiPay.Login_Ebi_Pay(Form_Data).subscribe({
      next: (res: any) => {
        if (res.result == "success") {
          this.Token_Ebi_Pay = res.data.token
          console.log(res)
        } else {
          console.log(res)
        }
      },
      error: (err) => {
        //console.log("Error del Post de EbiPay Login")
        Swal.fire({ title: 'Oops... Error EBI', text: '¡Algo salió mal!, por favor intenta de nuevo.' + err, icon: 'error', confirmButtonText: 'Cerrar' });
      }
    })

  }

  public CodRedSocialEBI() {

    /*
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
    */

    const FORM_DATA_COD = new FormData();

    FORM_DATA_COD.append('llave', '24dd6249787d91870bf89b36fae4307bcbd21226');
    FORM_DATA_COD.append('token', this.Token_Ebi_Pay);


    this.EbiPay.Cod_Red_Social_Ebi(FORM_DATA_COD).
      pipe(
        map((res: any) => {
          this.CodRedSocial_Ebi_Pay = res.data[0].codigo
          return this.CodRedSocial_Ebi_Pay;
        }),
        //catchError((err)=> /*this.handleError(err)*/ console.log(err))
      );




    /*subscribe({
      next:(res:any) => {
        if (res.result == "success"){
          //console.log("Lo que trae Codigo RedSocial")
          //console.log(res);
          this.CodRedSocial_Ebi_Pay = res.data[0].codigo

          
          //console.log(res.data[0].nombre)
          Swal.fire({title: 'Felicidades!', text: 'Si logro trear la red social.', icon: 'success', confirmButtonText: 'Cerrar' });
        }else{
          Swal.fire({ title: 'Oops...', text: '¡Algo salió mal!, por favor intenta de nuevo.' + res.message, icon: 'error', confirmButtonText: 'Cerrar' });  
        }
      },
      error:(err) => {
        console.log("Error del Post de EbiPay Login")
        Swal.fire({ title: 'Oops...', text: '¡Algo salió mal!, por favor intenta de nuevo.' + err, icon: 'error', confirmButtonText: 'Cerrar' });
      }
    })

    this.Token_Ebi_Pay = "";
   */
  }


  public Plan_Free() {

    this.Fecha_Actual = new Date();

    this.Fecha_Actual_Format_OK = this.datePipe.transform(this.Fecha_Actual, "yyyy-MM-dd")

    const Json_Data_Free = {
      user: localStorage.getItem('User_Id'),
      tipo: "Free",
      fecha: this.Fecha_Actual_Format_OK,
      estado: true
    }

    console.log("Objeto JSON Datos")
    console.log(Json_Data_Free)

    this.Sus_Registrar.Registrar_Suscripcion(Json_Data_Free).subscribe({

      next: (res: any) => {

        Swal.fire(
          {
            title: 'Bienvenido!',
            text: 'Gracias por elegir LoGFeL, te has suscrito al plan free. Recuerda que son 15 dias de uso.',
            icon: 'success',
            confirmButtonText: 'Cerrar'
          }
        );

        this.router.navigate(["empresa"]);

      },
      error: (err) => {

        Swal.fire({
          title: 'Oops...',
          text: '¡Algo salió mal!, por favor intenta de nuevo.' + err,
          icon: 'error',
          confirmButtonText: 'Cerrar'
        });


      }

    })

  }

  public Plan_Mensual() {

    this.Fecha_Actual = new Date();

    this.Fecha_Actual_Format_OK = this.datePipe.transform(this.Fecha_Actual, "yyyy-MM-dd")

    const Json_Data_Mensual = {
      user: localStorage.getItem('User_Id'),
      tipo: "Mensual",
      fecha: this.Fecha_Actual_Format_OK,
      estado: true
    }

    this.Sus_Registrar.Registrar_Suscripcion(Json_Data_Mensual).subscribe({

      next: (res: any) => {

        Swal.fire(
          {
            title: 'Bienvenido!',
            text: 'Gracias por elegir LoGFeL, te has suscrito al plan mensual. Recuerda que debes enviar tu boleta de pago.',
            icon: 'success',
            confirmButtonText: 'Cerrar'
          })

        this.Link_Ebi_Pay_Mensual();

        this.router.navigate(["empresa"]);

        console.log("Se registro bien")

        console.log(res)

      },
      error: (err) => {

        Swal.fire({
          title: 'Oops...',
          text: '¡Algo salió mal!, por favor intenta de nuevo.' + err,
          icon: 'error',
          confirmButtonText: 'Cerrar'
        });


        console.log("Se registro mal")
        console.log(err)

      }
    });



  }





  public Link_Ebi_Pay_Mensual() {

    this.CodRedSocialEBI();

    const FORM_DATA_LINK = new FormData();
    FORM_DATA_LINK.append('llave', '24dd6249787d91870bf89b36fae4307bcbd21226');
    FORM_DATA_LINK.append('token', this.Token_Ebi_Pay);
    FORM_DATA_LINK.append('nombre_interno', 'Link_Ebi_Pay_Mensual');
    FORM_DATA_LINK.append('codigo_interno', 'LMENSUAL000001');
    FORM_DATA_LINK.append('titulo', 'LOGFEL SUSCRIPCION MENSUAL');
    FORM_DATA_LINK.append('descripcion', 'Suscripción mensual LOGFEL');
    FORM_DATA_LINK.append('monto', '1');
    FORM_DATA_LINK.append('estado', '1');
    FORM_DATA_LINK.append('cuotas', 'VC00');
    FORM_DATA_LINK.append('redes_sociales', '1621282737059942b');
    FORM_DATA_LINK.append('eliminar_imagen', '');

    this.EbiPay.Link_Ebi(FORM_DATA_LINK).subscribe({
      next: (res: any) => {
        if (res.result == "success") {
          console.log("Lo que trae el Link")
          console.log(res);
          console.log(res.data[0].url)

          window.open(res.data[0].url);
          //this.CodRedSocial_Ebi_Pay = res.data[0].codigo
          //console.log(res.data[0].nombre)
        } else {
          Swal.fire({ title: 'Oops...', text: '¡Algo salió mal!, por favor intenta de nuevo.' + res.message, icon: 'error', confirmButtonText: 'Cerrar' });
        }
      },
      error: (err) => {
        console.log("Error del Post de EbiPay Link")
        Swal.fire({ title: 'Oops...', text: '¡Algo salió mal!, por favor intenta de nuevo.' + err, icon: 'error', confirmButtonText: 'Cerrar' });
      }
    })

  }
}
