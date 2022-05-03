import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Offer } from '../model/offer';

@Injectable({
  providedIn: 'root'
})
export class OfferService {


  readonly API_URL = 'http://localhost:8085/PIDEV/offer';
  
  constructor(private httpClient: HttpClient) { }

  getAllOffers() {
    return this.httpClient.get(`${this.API_URL}/retrieve-all-Offers`,
    {headers: new HttpHeaders().append("Authorization","Bearer "+localStorage.getItem('token'))})
  }
  addOffer(offer : Offer): Observable<Object> {
    return this.httpClient.post(`${this.API_URL}/add-Offer`, offer,
    {headers: new HttpHeaders().append("Authorization","Bearer "+localStorage.getItem('token'))})
  }
  editOffer(offer : any){
    return this.httpClient.put(`${this.API_URL}/modify-Offer`, offer,
    {headers: new HttpHeaders().append("Authorization","Bearer "+localStorage.getItem('token'))})
  }
  deleteOffer(idoffer : Number)  {
    return  this.httpClient.delete(`${this.API_URL}/remove-Offer/${idoffer}`,
    {headers: new HttpHeaders().append("Authorization","Bearer "+localStorage.getItem('token'))})
  }
  archiveOffer(idoffer : Number) :Observable<Object> {
    return  this.httpClient.put(`${this.API_URL}/archive-Offer`,idoffer,
    {headers: new HttpHeaders().append("Authorization","Bearer "+localStorage.getItem('token'))})
  }
  desarchiveOffer(idoffer : Number) :Observable<Object> {
    return  this.httpClient.put(`${this.API_URL}/desarchive-Offer`,idoffer,
    {headers: new HttpHeaders().append("Authorization","Bearer "+localStorage.getItem('token'))})
 }
 getClaim(idoffer : Number) {
    return this.httpClient.get(`${this.API_URL}/retrieve-Offer/${idoffer}`,
    {headers: new HttpHeaders().append("Authorization","Bearer "+localStorage.getItem('token'))})
  }

}
