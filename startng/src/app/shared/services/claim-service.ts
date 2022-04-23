import { Injectable } from '@angular/core';

import { HttpClient} from '@angular/common/http';
import { Claim } from '../model/claim';

@Injectable({
  providedIn: 'root'
})
export class ClaimService {
  readonly API_URL = 'http://localhost:8087';
  
  constructor(private httpClient: HttpClient) { }

  getAllClaims() {
    return this.httpClient.get(`${this.API_URL}/all-claims`)
  }
  addClaim(claim : any) {
    return this.httpClient.post(`${this.API_URL}/add-claim`, claim)
  }
  editClaim(claim : any){
    return this.httpClient.put(`${this.API_URL}/modify-Claim`, claim)
  }
  deleteClaim(idclaim : any){
    return  this.httpClient.delete(`${this.API_URL}/remove-Claim/${idclaim}`)
  }

}