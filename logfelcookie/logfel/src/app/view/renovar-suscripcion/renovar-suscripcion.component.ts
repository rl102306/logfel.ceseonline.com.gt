import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { EbipayService } from 'src/app/models/ebipay.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { SuscripcionService } from 'src/app/models/suscripcion.service';
import { AuthUserService } from 'src/app/auth/auth-user.service';

@Component({
  selector: 'app-renovar-suscripcion',
  templateUrl: './renovar-suscripcion.component.html',
  styleUrls: ['./renovar-suscripcion.component.css']
})
export class RenovarSuscripcionComponent implements OnInit {

  breakpoint: any;
  private Fecha_Actual: any;
  private Token_Ebi_Pay: any;
  private Fecha_Actual_Format_OK: any;

  constructor(
    private EbiPay: EbipayService,
    private datePipe: DatePipe,
    private router: Router,
    private Sus_Registrar: SuscripcionService,
    private UserLogout:AuthUserService) { }

  ngOnInit() {
    this.breakpoint = (window.innerWidth <= 800) ? 1 : 2;
    this.LoginEBI();
  }

  onResize(event: any) {
    this.breakpoint = (event.target.innerWidth <= 800) ? 1 : 2;
  }

  public LoginEBI() {
    const Form_Data = new FormData();
    Form_Data.append('llave', '24dd6249787d91870bf89b36fae4307bcbd21226');
    Form_Data.append('usuario', 'ronaldolara58@gmail.com');
    Form_Data.append('clave', 'Ebi2022$$')
    this.EbiPay.Login_Ebi_Pay(Form_Data).subscribe({
      next: (res: any) => {
        if (res.result == "success") {
          this.Token_Ebi_Pay = res.data.token
          console.log("Exito")
          console.log(res)
        } else {
          console.log("Fracaso")
          console.log(res)
        }
      },
      error: (err) => {
        console.log("Error del Post de EbiPay Login")
        Swal.fire({ title: 'Oops...', text: '¡Algo salió mal!, por favor intenta de nuevo.' + err, icon: 'error', confirmButtonText: 'Cerrar' });
      }
    })
  }

  public Plan_Mensual_Renovacion() {

    this.Fecha_Actual = new Date();

    this.Fecha_Actual_Format_OK = this.datePipe.transform(this.Fecha_Actual, "yyyy-MM-dd")
    
    const Json_Data_User = {
      usuario: localStorage.getItem('User_Id'),
    }

    const Json_Data_Mensual = {
      user: localStorage.getItem('User_Id'),
      tipo: "Mensual",
      fecha: this.Fecha_Actual_Format_OK,
      estado: false
    }

    this.Sus_Registrar.Historia_Suscripcion(Json_Data_User).subscribe({
      next: (res: any) => {
        console.log("Historia Suscripcion")
        console.log(res)
        this.Sus_Registrar.Renovar_Suscripcion(Json_Data_Mensual).subscribe({
          next: (res: any) => {

            Swal.fire(
              {
                title: 'Bienvenido!',
                text: 'Gracias por elegir LoGFeL, haz renovado tu suscripcion al plan mensual. Recuerda que debes enviar tu boleta de pago a info@ceseonline.com.gt .',
                icon: 'success',
                confirmButtonText: 'Cerrar'
              })
        
            this.Link_Ebi_Pay_Mensual_Renovacion();

            this.UserLogout.logout()
            

            
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
        })
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

  public Link_Ebi_Pay_Mensual_Renovacion() {

    const FORM_DATA_LINK = new FormData();
    FORM_DATA_LINK.append('llave', '24dd6249787d91870bf89b36fae4307bcbd21226');
    FORM_DATA_LINK.append('token', this.Token_Ebi_Pay);
    FORM_DATA_LINK.append('nombre_interno', 'Link_Ebi_Pay_Mensual_Renovacion');
    FORM_DATA_LINK.append('codigo_interno', 'LRMENSUAL000002');
    FORM_DATA_LINK.append('titulo', 'LOGFEL SUSCRIPCION MENSUAL RENOVACION');
    FORM_DATA_LINK.append('descripcion', 'Suscripción mensual LOGFEL');
    FORM_DATA_LINK.append('monto', '1');
    FORM_DATA_LINK.append('estado', '1');
    FORM_DATA_LINK.append('cuotas', 'VC00');
    FORM_DATA_LINK.append('redes_sociales', '1621282737059942b');
    FORM_DATA_LINK.append('eliminar_imagen', '');

    this.EbiPay.Link_Ebi(FORM_DATA_LINK).subscribe({
      next: (res: any) => {
        if (res.result == "success") {
          window.open(res.data[0].url);
          //this.CodRedSocial_Ebi_Pay = res.data[0].codigo
          //console.log(res.data[0].nombre)
          //Swal.fire({ title: 'Felicidades!', text: 'Si logro trear el link.', icon: 'success', confirmButtonText: 'Cerrar' });
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
