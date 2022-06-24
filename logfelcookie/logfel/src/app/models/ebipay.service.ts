import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EbipayService {

  constructor(private http: HttpClient) { }

  public Login_Ebi_Pay(formData:any){
    return this.http.post<any>(`${environment.API_URL}/api/login_ebi`,formData);
  }

  public Cod_Red_Social_Ebi(formData:any){
    return this.http.post<any>(`${environment.API_URL}/api/cod_red_social_ebi`,formData)
  }

  public Link_Ebi(formData:any){
    return this.http.post<any>(`${environment.API_URL}/api/link_ebi_pay`,formData)
  }

}
