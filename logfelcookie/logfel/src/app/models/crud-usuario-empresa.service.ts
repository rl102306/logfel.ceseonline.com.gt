import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CrudUsuarioEmpresaService {

  constructor(private http: HttpClient) { }


  public Crear_Usuario(Usuario_Nuevo_Json: any) {

    return this.http.post<any>(`${environment.API_URL}/api/user/post`,Usuario_Nuevo_Json)

  }

  public Crear_Empresa(Empresa_Nueva_Json: any) {

    return this.http.post<any>(`${environment.API_URL}/api/company/post`,Empresa_Nueva_Json)
   
  }

  public Crear_Perfil_Usuario_Empresa(Perfil_Json:any){
    return this.http.post<any>(`${environment.API_URL}/api/crear_perfil`,Perfil_Json)
  }

}
