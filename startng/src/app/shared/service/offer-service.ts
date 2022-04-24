import { Injectable } from '@angular/core';

import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Offer } from '../model/offer';

@Injectable({
  providedIn: 'root'
})
export class OfferService {


  readonly API_URL = 'http://localhost:8085/PIDEV/offer';
  
  constructor(private httpClient: HttpClient) { }

  getAllOffers() {
    return this.httpClient.get(`${this.API_URL}/retrieve-all-Offers`)
  }
  addOffer(offer : Offer): Observable<Object> {
    return this.httpClient.post(`${this.API_URL}/add-Offer`, offer)
  }
  editOffer(offer : any){
    return this.httpClient.put(`${this.API_URL}/modify-Offer`, offer)
  }
  deleteOffer(idoffer : Number)  {
    return  this.httpClient.delete(`${this.API_URL}/remove-Offer/${idoffer}`)
  }
  archiveOffer(idoffer : Number) :Observable<Object> {
    return  this.httpClient.put(`${this.API_URL}/archive-Offer`,idoffer)
  }
  desarchiveOffer(idoffer : Number) :Observable<Object> {
    return  this.httpClient.put(`${this.API_URL}/desarchive-Offer`,idoffer)
 }
 getClaim(idoffer : Number) {
    return this.httpClient.get(`${this.API_URL}/retrieve-Offer/${idoffer}`)
  }

}
