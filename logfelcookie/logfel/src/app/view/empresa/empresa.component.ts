import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CrudUsuarioEmpresaService } from 'src/app/models/crud-usuario-empresa.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.css']
})
export class EmpresaComponent implements OnInit {

  public Form_Registrar_Empresa: any;
  public File_Upload: File | null = null;


  constructor(
    private Form_Builder_Registrar_Empresa: FormBuilder,
    private CEmpresa: CrudUsuarioEmpresaService,
    private router: Router
    ) { }

  ngOnInit(): void {

    this.Form_Registrar_Empresa = this.Form_Builder_Registrar_Empresa.group({
      Nombre_Empresa: ['', Validators.required],
      Nit: ['', Validators.required],
      Direccion_Empresa: ['', Validators.required],
      Nombre_File_Logo_Empresa: ['', Validators.required]
    })

  }
  
  Get_File_Input(event:any)
  {
    if(event.target.files.length > 0 ){
      this.File_Upload = event.target.files[0];
      this.Form_Registrar_Empresa.get('Nombre_File_Logo_Empresa').setValue(this.File_Upload);
    }
  }

  

  onSubmitCreateCompany()
  {
    if
      (
        this.Form_Registrar_Empresa.get('Nombre_Empresa').value == "" || 
        this.Form_Registrar_Empresa.get('Nit').value == "" ||
        this.Form_Registrar_Empresa.get('Direccion_Empresa').value == "" ||
        this.Form_Registrar_Empresa.get('Nombre_File_Logo_Empresa').value == ""
      )
      {
        Swal.fire(
          { 
            title: 'Oops...', 
            text: '¡Algo salió mal!, por favor revisa que todos los campos esten llenos.', 
            icon: 'error', 
            confirmButtonText: 'Cerrar' 
          }
        )
      }
      else
      {
        const Form_Data_Company = new FormData();
        Form_Data_Company.append('nombre', this.Form_Registrar_Empresa.get('Nombre_Empresa').value);
        Form_Data_Company.append('nit', this.Form_Registrar_Empresa.get('Nit').value);
        Form_Data_Company.append('direccion', this.Form_Registrar_Empresa.get('Direccion_Empresa').value);
        Form_Data_Company.append('logo', this.Form_Registrar_Empresa.get('Nombre_File_Logo_Empresa').value);
        Form_Data_Company.append('estado','false');
   
        this.CEmpresa.Crear_Empresa(Form_Data_Company).subscribe({
          next: (res: any) => {

            console.log("Que informacion trae al crear la empresa")
            console.log(res)

            Swal.fire(
              { 
                title: 'Felicidades!', 
                text: 'Tu empresa ha sido creada. Bienvenid@ a LoGFeL.', 
                icon: 'success', 
                confirmButtonText: 'Cerrar' 
              }
            );

            const Json_Perfil_Usuario_Empresa = {
              user: localStorage.getItem('User_Id'),
              empresa: res.id
            }

            this.CEmpresa.Crear_Perfil_Usuario_Empresa(Json_Perfil_Usuario_Empresa).subscribe({
              next: (res: any) => {
                console.log("Se creo el perfil")
                console.log(res)
                this.router.navigate(["ucf"]);
              },
              error: (err) => {
                console.log(" No se creo el perfil")
                console.log(err)
                Swal.fire(
                  { 
                    title: 'Oops...', 
                    text: '¡Algo salió mal!, por favor contacta a soporte tecnico al correo info@ceseonline.com.gt.', 
                    icon: 'error', 
                    confirmButtonText: 'Cerrar' 
                  }
                )
              }
            })

            this.Form_Registrar_Empresa.reset()


          },
            error: (err) => {
              Swal.fire(
                { 
                  title: 'Oops...', 
                  text: '¡Algo salió mal!, por favor intenta de nuevo.', 
                  icon: 'error', 
                  confirmButtonText: 'Cerrar' 
                }
              )
            }
        })
      }
  }
}