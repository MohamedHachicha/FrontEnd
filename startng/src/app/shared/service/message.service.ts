import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Message } from '../model/message';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
    readonly API_URL = 'http://localhost:8085/PIDEV/message';
  
    constructor(private httpClient: HttpClient) { }    

      addMessage(message : Message,Conversationid:Number): Observable<Object> {
        return this.httpClient.post(`${this.API_URL}/add-Message/${Conversationid}`,message,
        {headers: new HttpHeaders().append("Authorization","Bearer "+localStorage.getItem('token'))})
      }
      editMessage(message : any){
        return this.httpClient.put(`${this.API_URL}/modify-Message`, message,
        {headers: new HttpHeaders().append("Authorization","Bearer "+localStorage.getItem('token'))})
      }
      deleteMessage(idmessage : Number)  {
        return  this.httpClient.delete(`${this.API_URL}/remove-Message/${idmessage}`,
        {headers: new HttpHeaders().append("Authorization","Bearer "+localStorage.getItem('token'))})
      }
      archiveMessage(idmessage : Number) :Observable<Object> {
        return  this.httpClient.put(`${this.API_URL}/archive-Message`,idmessage,
        {headers: new HttpHeaders().append("Authorization","Bearer "+localStorage.getItem('token'))})
      }
      desarchiveMessage(idmessage : Number) :Observable<Object> {
        return  this.httpClient.put(`${this.API_URL}/desarchive-Message`,idmessage,
        {headers: new HttpHeaders().append("Authorization","Bearer "+localStorage.getItem('token'))})
     }
     getClaim(idmessage : Number) {
        return this.httpClient.get(`${this.API_URL}/retrieve-Offer/${idmessage}`,
        {headers: new HttpHeaders().append("Authorization","Bearer "+localStorage.getItem('token'))})
      }
}
