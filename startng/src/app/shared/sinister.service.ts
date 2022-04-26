import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Sinister } from './model/sinister';

@Injectable({
  providedIn: 'root'
})
export class SinisterService {

  readonly API_URL = 'http://localhost:8087/PIDEV_GARANTIA/Sinister';
  
  constructor(private httpClient: HttpClient) { }

  getAllSinister() {
    return this.httpClient.get(`${this.API_URL}/retrieve-all-sinisters`)
  }
  getSinisterbuId() {
    return this.httpClient.get(`${this.API_URL}/retrieve-sinister`)
  }
  addSinister(  sinister : Sinister) {
    return this.httpClient.post(`${this.API_URL}/add-sinister`,   sinister)
  }
  editSinister(  sinister : Sinister){
    return this.httpClient.put(`${this.API_URL}/update-Sinister/`,sinister)
  }
  deleteSinister(idSinister : Number):Observable<Object>{
    return  this.httpClient.delete(`${this.API_URL}/delete-Sinister/${idSinister}`)
  }

  treatSinister(idSinister : any): Observable<Object>{
    return this.httpClient.get(`${this.API_URL}  /traiterSinistre`, idSinister)
  }
  suivreSinister(idSinister : any): Observable<Object>{
    return this.httpClient.get(`${this.API_URL}  /suivreSinistre`, idSinister)
  }
  verfiferDelay (idSinister : any): Observable<Object>{
    return this.httpClient.get(`${this.API_URL}  /verificationSinisterDelay`, idSinister)
  }
  calculRapidité (idSinister : any): Observable<Object>{
    return this.httpClient.get(`${this.API_URL}  /calcul-Rapidité`, idSinister)
  }


}
