import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { StepperOrientation } from '@angular/material/stepper';
import { map, Observable } from 'rxjs';
import { CrudUsuarioEmpresaService } from 'src/app/models/crud-usuario-empresa.service';
import { AuthUserService } from 'src/app/auth/auth-user.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public Bool_IsEditable = false;
  public SC_Primer_Paso: any;
  public SC_Segundo_Paso: any;
  public SC_Tercer_Paso: any;
  public StepperOrientacion: Observable<StepperOrientation> | any;
  public Form_Registrar_Usuario: any;
  public hide = true;
  public Str_Confirm_Pass_Message = '';
  public Str_Token: any;
  public Bool_Password_Coincide = false;
  public Form_Registrar_Empresa: any;


  public File_Upload: File | null = null;

  constructor(private authUserService: AuthUserService, private CUser: CrudUsuarioEmpresaService,
    private CEmpresa: CrudUsuarioEmpresaService, breakPointObserver: BreakpointObserver, private Form_Builder_Registrar_Usuario: FormBuilder,
    private Form_Builder_Registrar_Empresa: FormBuilder) {
    this.StepperOrientacion = breakPointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({ matches }) => matches ? 'horizontal' : 'vertical'));
  }

  ngOnInit() {

    this.Form_Registrar_Usuario = this.Form_Builder_Registrar_Usuario.group({
      User: ['', Validators.required],
      Pass: ['', [Validators.required, Validators.pattern('^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}')]],
      Email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      Name: ['', Validators.required],
      ConfirmPass: ['', [Validators.required]],
      Apellido: ['', [Validators.required]],
    })
    this.Form_Registrar_Empresa = this.Form_Builder_Registrar_Empresa.group({
      Nombre_Empresa: ['', Validators.required],
      Nit: ['', Validators.required],
      Direccion_Empresa: ['', Validators.required],
      Nombre_File_Logo_Empresa: ['', Validators.required]
    })
  }


  onSubmitCreateUser() {
    if (this.Bool_Password_Coincide) {
      const Json_User_Param = {
        User: this.Form_Registrar_Usuario.get('User').value,
        Pass: this.Form_Registrar_Usuario.get('Pass').value,
        Email: this.Form_Registrar_Usuario.get('Email').value,
        Name: this.Form_Registrar_Usuario.get('Name').value,
        Apellido: this.Form_Registrar_Usuario.get('Apellido').value
      }
      this.CUser.Crear_Usuario(Json_User_Param).subscribe({
        next: (res: any) => {
          Swal.fire(
            { title: 'Felicidades!', text: 'Tu usuario ha sido creado. Bienvenid@ a LoGFeL.', icon: 'success', confirmButtonText: 'Cerrar' }
          );
          this.Form_Registrar_Usuario.reset()
        },
        error: (err) => {
          if (err.error == "190") {
            Swal.fire({ title: 'Oops...', text: '¡El usuario para iniciar sesion ya existe!, por favor intenta con otro.', icon: 'error', confirmButtonText: 'Cerrar' }
            )
          }
          else {
            Swal.fire({ title: 'Oops...', text: '¡Algo salió mal!, por favor intenta de nuevo.', icon: 'error', confirmButtonText: 'Cerrar' }
            )
          }
        }
      }
      )
    } else {
      Swal.fire({ title: 'Oops...', text: this.Str_Confirm_Pass_Message, icon: 'error', confirmButtonText: 'Cerrar' });
    }
  }

  onChangeEvent(event: any): void {

    const Str_Pass_Val = this.Form_Registrar_Usuario.get('Pass').value
    const Str_Confirm_Pass_Val = event.target.value

    if (Str_Pass_Val == Str_Confirm_Pass_Val) {
      this.Bool_Password_Coincide = true
      Swal.fire(
        { title: 'Notificacion', text: 'Las contraseñas coinciden.', icon: 'success', confirmButtonText: 'Cerrar' }
      );
    } else {
      this.Str_Confirm_Pass_Message = "Favor verifique las contraseña no coinciden."
      this.Bool_Password_Coincide = false
      Swal.fire({ title: 'Oops...', text: this.Str_Confirm_Pass_Message, icon: 'error', confirmButtonText: 'Cerrar' })
    }
  }

  onChangePassword() {
    const Str_Pass_Val = this.Form_Registrar_Usuario.get('Pass').value
    const Str_Confirm_Pass_Val = this.Form_Registrar_Usuario.get('ConfirmPass').value
    if (Str_Pass_Val == Str_Confirm_Pass_Val) {
      this.Bool_Password_Coincide = true
    } else {
      this.Str_Confirm_Pass_Message = "Favor verifique las contraseña no coinciden."
      this.Bool_Password_Coincide = false
    }
  }

  Get_File_Input(event:any)
  {
    if(event.target.files.length > 0 ){
      this.File_Upload = event.target.files[0];
      this.Form_Registrar_Empresa.get('Nombre_File_Logo_Empresa').setValue(this.File_Upload);
    }
  }

  

/*  onSubmitCreateCompany() {

    const Form_Data_Company = new FormData();
    Form_Data_Company.append('nombre', this.Form_Registrar_Empresa.get('Nombre_Empresa').value);
    Form_Data_Company.append('nit', this.Form_Registrar_Empresa.get('Nit').value);
    Form_Data_Company.append('direccion', this.Form_Registrar_Empresa.get('Direccion_Empresa').value);
    Form_Data_Company.append('logo', this.Form_Registrar_Empresa.get('Nombre_File_Logo_Empresa').value);
    Form_Data_Company.append('estado','false');
   
/*
    const Json_Empresa_Param = {
      nombre_empresa: this.Form_Registrar_Empresa.get('Nombre_Empresa').value,
      nit: this.Form_Registrar_Empresa.get('Nit').value,
      direccion: this.Form_Registrar_Empresa.get('Direccion_Empresa').value,
      logo:  this.Form_Registrar_Empresa.get('Nombre_File_Logo_Empresa').value,
      estado: false
    }
        
        this.CEmpresa.Crear_Empresa(Form_Data_Company).subscribe({
          next: (res: any) => {
            Swal.fire(
              { title: 'Felicidades!', text: 'Tu empresa ha sido creada. Bienvenid@ a LoGFeL.', icon: 'success', confirmButtonText: 'Cerrar' }
            );
            this.Form_Registrar_Empresa.reset()
          },
          error: (err) => {
            Swal.fire({ title: 'Oops...', text: '¡Algo salió mal!, por favor intenta de nuevo.', icon: 'error', confirmButtonText: 'Cerrar' })
          }
        })
  }*/
}
