import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SuscripcionService {

  constructor(private http: HttpClient) { }

  public Existe_Suscripcion(Id_Usuario_Json: any){
    return this.http.post<any>(`${environment.API_URL}/api/suscripcion_existe`,Id_Usuario_Json);
  }

  public Registrar_Suscripcion(Json_Data_Suscripcion:any){
    return this.http.post<any>(`${environment.API_URL}/api/registrar_suscripcion`,Json_Data_Suscripcion);
  }

  public Estado_Suscripcion(Json_Data_Suscripcion:any){
    return this.http.post<any>(`${environment.API_URL}/api/estado_suscripcion`,Json_Data_Suscripcion);
  }

  public Historia_Suscripcion(Json_Data_Suscripcion:any){
    return this.http.post<any>(`${environment.API_URL}/api/historia_suscripcion`,Json_Data_Suscripcion);
  }

  public Renovar_Suscripcion(Json_Data_Suscripcion:any){
    return this.http.post<any>(`${environment.API_URL}/api/renovar_suscripcion`,Json_Data_Suscripcion);
  }

}
