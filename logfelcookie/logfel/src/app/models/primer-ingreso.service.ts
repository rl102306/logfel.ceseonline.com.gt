import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class PrimerIngresoService {
  constructor(private http: HttpClient) { }
  public Obtener_Empresa(Id_Usuario_Json: any){
    return this.http.post<any>(`${environment.API_URL}/api/empresa_existe/post`,Id_Usuario_Json);
  }
}
