import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UploadFactService {

  
  constructor(private http: HttpClient) { }

  public Str_Cookie_Csrf: any;
  
  public Upload_File(fact_file: any,token:any) {

    let httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'token '+ token
      })
    };
    return this.http.post<any>(`${environment.API_URL}/api/File_Upload_Fact_Ini/post`,fact_file,httpOptions)
  }

  public postfile(formData:any,token:any){

    let httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'token '+ token,
        'Content-Type': 'application/json'
      })
    };
  

    return this.http.post<any>(`${environment.API_URL}/api/Posicion_Size/post`,formData,httpOptions);
    
  }

}
