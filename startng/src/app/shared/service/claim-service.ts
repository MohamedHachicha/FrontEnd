import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Claim } from '../model/claim';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClaimService {
  readonly API_URL = 'http://localhost:8085/PIDEV/claim';
  
  constructor(private httpClient: HttpClient) { }

  getAllClaims() {
    return this.httpClient.get(`${this.API_URL}/retrieve-visible`,
    {headers: new HttpHeaders().append("Authorization","Bearer "+localStorage.getItem('token'))})
  }
  addClaim(claim : Claim): Observable<Object> {
    return this.httpClient.post(`${this.API_URL}/add-Claim`, claim,
    {headers: new HttpHeaders().append("Authorization","Bearer "+localStorage.getItem('token'))})
  }
  editClaim(claim : any){
    return this.httpClient.put(`${this.API_URL}/modify-Claim`, claim,
    {headers: new HttpHeaders().append("Authorization","Bearer "+localStorage.getItem('token'))})
  }
  deleteClaim(idclaim : Number)  {
    return  this.httpClient.delete(`${this.API_URL}/remove-Claim/${idclaim}`,
    {headers: new HttpHeaders().append("Authorization","Bearer "+localStorage.getItem('token'))})
  }
  archiveClaim(idclaim : Number) :Observable<Object> {
    return  this.httpClient.put(`${this.API_URL}/archive-Claim`,idclaim,
    {headers: new HttpHeaders().append("Authorization","Bearer "+localStorage.getItem('token'))})
  }
  desarchiveClaim(idclaim : Number) :Observable<Object> {
    return  this.httpClient.put(`${this.API_URL}/desarchive-Claim`,idclaim,
    {headers: new HttpHeaders().append("Authorization","Bearer "+localStorage.getItem('token'))})

  }
  treatClaim(idclaim : any,reponse:any): Observable<Object>{
    return this.httpClient.put(`${this.API_URL}/Treat_claim`, idclaim,reponse)
  }
}