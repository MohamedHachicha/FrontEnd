import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Sinister } from './model/sinister';

@Injectable({
  providedIn: 'root'
})
export class SinisterService {

  readonly API_URL = '/api/PIDEV_GARANTIA';
  
  constructor(private httpClient: HttpClient) { }

  getAllSinister() {
    return this.httpClient.get(`${this.API_URL}/Sinister/retrieve-all-sinisters`);
  }
  getSinisterbyId() {
    return this.httpClient.get(`${this.API_URL}/Sinister/retrieve-sinister`);
  }
  addSinister(  sinister : Sinister) {
    return this.httpClient.post(`${this.API_URL}/Sinister/add-sinister`,   sinister);
  }
  editSinister(  sinister : Sinister){
    return this.httpClient.put(`${this.API_URL}/Sinister/update-Sinister/`,sinister);
  }
  deleteSinister(idSinister : Number):Observable<Object>{
    return  this.httpClient.delete(`${this.API_URL}/Sinister/delete-Sinister/${idSinister}`);
  }

  treatSinister(idSinister : any): Observable<Object>{
    return this.httpClient.get(`${this.API_URL}  /Sinister/traiterSinistre`, idSinister);
  }
  suivreSinister(idSinister : any): Observable<Object>{
    return this.httpClient.get(`${this.API_URL}  /Sinister/suivreSinistre`, idSinister);
  }
  verfiferDelay (idSinister : any): Observable<Object>{
    return this.httpClient.get(`${this.API_URL}  /Sinister/verificationSinisterDelay`, idSinister);
  }
  calculRapidité (idSinister : any): Observable<Object>{
    return this.httpClient.get(`${this.API_URL}  /Sinister/calcul-Rapidité`, idSinister);
  }


}
