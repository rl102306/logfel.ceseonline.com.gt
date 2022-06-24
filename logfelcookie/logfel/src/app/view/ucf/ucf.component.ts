import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatRadioChange } from '@angular/material/radio';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { StepperOrientation } from '@angular/material/stepper';
import { map, Observable } from 'rxjs';
import { AuthUserService } from 'src/app/auth/auth-user.service';
import { UploadFactService } from 'src/app/models/upload-fact.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ucf',
  templateUrl: './ucf.component.html',
  styleUrls: ['./ucf.component.css']
})
export class UcfComponent implements OnInit {

  public Bool_IsEditable = false;
  public SC_Primer_Paso: any;
  public SC_Segundo_Paso: any;
  public SC_Tercer_Paso:any;
  public SC_Cuarto_Paso:any;
  public File_Upload: File | null = null;
  public StepperOrientacion: Observable<StepperOrientation> | any;
  private token: any;
  public File_Name_Request: any;
  public File_Url_Preview: any;
  public Mostrar_Tam: boolean = false;
  public File_Url_Fact_Logo: any;
  public Str_Posicion_Combo: any;
  public Str_Id_User: any;
  public Str_Size_Logo: any;
  public Str_Url: any;
  public zoom = '100%';
  public Bool_Disabled_MST = false;
  public Bool_Checked_MST = false;
  public Mostrar_Div_QR = false;
  public Str_Link_Cod_QR = " ";
  public Str_Slogan = " ";
  public Base64_PDF = "";

  @ViewChild('pdfViewerOnDemand') pdfViewerOnDemand: any;
  

  constructor(private authUserService: AuthUserService, breakPointObserver: BreakpointObserver,
    private UploadFile:UploadFactService) { 
    this.StepperOrientacion = breakPointObserver
    .observe('(min-width: 800px)')
    .pipe(map(({matches}) => matches ? 'horizontal' : 'vertical'));
  }

  ngOnInit(): void {
   
  }
  
  onLogout(){
    this.authUserService.logout();
  }

  Get_File_Input(event:any)
  {
    if(event.target.files.length > 0 ){
      this.File_Upload = event.target.files[0];
    }
  }

  MostrarTam(event: MatRadioChange ){
    this.Mostrar_Tam = true;
    this.Str_Posicion_Combo = event.value
  }

  GetTam(event:MatRadioChange){
    this.Str_Size_Logo = event.value
  }

  Mat_Toggle_Changes_Codigo_QR($event: MatSlideToggleChange) {
    this.Bool_Checked_MST = $event.checked;
    if(this.Mostrar_Div_QR == false){
      this.Mostrar_Div_QR = true;
      
    }
    else{
      this.Mostrar_Div_QR = false;
    }
  }

  Upload_File(){
    if(this.File_Upload){
      this.token = localStorage.getItem('Token');
      const Form_Data = new FormData();
      Form_Data.append('file',this.File_Upload);
      Form_Data.append('Str_Id_Usuario',"1");
      this.UploadFile.Upload_File(Form_Data,this.token).subscribe({
        next: (res:any) =>{
          this.File_Name_Request = res.file;
          this.File_Url_Preview = `${environment.API_URL}${this.File_Name_Request}`;
          Swal.fire(
            { title: 'Felicidades!', text: 'Tu archivo ha sido cargado.', icon: 'success', confirmButtonText: 'Cerrar' }
            );
        },
          error:(err) => Swal.fire({ title: 'Oops...', text: '¡Algo salió mal!, por favor intenta de nuevo.', icon: 'error', confirmButtonText: 'Cerrar' } 
          )
        }
      )
    }
  }

  refresh(): void { window.location.reload(); }


  Get_Fact_Mod() {
    this.token = localStorage.getItem('Token');
    this.Str_Id_User = localStorage.getItem('User_Id');
    try {
      this.Str_Link_Cod_QR = (<HTMLInputElement>document.getElementById("Cod_QR")).value;
      this.Str_Slogan = (<HTMLInputElement>document.getElementById("Slogan")).value;
    } catch (error) {
      this.Str_Link_Cod_QR = "N"
      this.Str_Slogan = "N"
    }

    if (this.Str_Link_Cod_QR == ""){
      this.Str_Link_Cod_QR = "N"
    }
    
    if(this.Str_Slogan == ""){
      this.Str_Slogan = "N"
    }
    
    console.log("QUE VALOR TRAE")
    console.log(this.Str_Slogan)
    console.log(this.Str_Link_Cod_QR)

    const Json_Fact_Param = {
      posicion : this.Str_Posicion_Combo,
      url : this.File_Name_Request,
      usuario: this.Str_Id_User,
      size: this.Str_Size_Logo,
      linkqrcod: this.Str_Link_Cod_QR,
      slogan: this.Str_Slogan
    }

    this.UploadFile.postfile(Json_Fact_Param,this.token).subscribe(
      (res) => {

        this.Base64_PDF = res;
        /*console.log("Respuesta que recibe")
        console.log(res)
        this.File_Url_Fact_Logo = `${environment.API_URL}${res}`;
        this.pdfViewerOnDemand.pdfSrc = this.File_Url_Fact_Logo
        this.pdfViewerOnDemand.refresh(); */
        Swal.fire(
          { title: 'Felicidades!', text: 'Tu factura ha sido personalizada.', icon: 'success', confirmButtonText: 'Cerrar' }
          );
      },
      (err) => {  
        Swal.fire({ title: 'Oops...', text: '¡Algo salió mal!, por favor intenta de nuevo.' + err, icon: 'error', confirmButtonText: 'Cerrar' });
      } 
    );
  }

  downloadPdf(base64String:any, fileName:any) 
  {
    const source = `data:application/pdf;base64,${base64String}`;
    const link = document.createElement("a");
    link.href = source;
    link.download = `${fileName}.pdf`
    link.click();
  }

  DownLoad_File(){
        
    let base64String = this.Base64_PDF;

    this.downloadPdf(base64String,"sample");
  }
}
