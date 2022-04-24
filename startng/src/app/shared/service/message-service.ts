import { Injectable } from '@angular/core';

import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Message } from '../model/message';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
    readonly API_URL = 'http://localhost:8085/PIDEV/message';
  
    constructor(private httpClient: HttpClient) { }    

      addMessage(message : Message,Conversationid:Number): Observable<Object> {
        return this.httpClient.post(`${this.API_URL}/add-Message/${Conversationid}`,message)
      }
      editMessage(message : any){
        return this.httpClient.put(`${this.API_URL}/modify-Message`, message)
      }
      deleteMessage(idmessage : Number)  {
        return  this.httpClient.delete(`${this.API_URL}/remove-Message/${idmessage}`)
      }
      archiveMessage(idmessage : Number) :Observable<Object> {
        return  this.httpClient.put(`${this.API_URL}/archive-Message`,idmessage)
      }
      desarchiveMessage(idmessage : Number) :Observable<Object> {
        return  this.httpClient.put(`${this.API_URL}/desarchive-Message`,idmessage)
     }
     getClaim(idmessage : Number) {
        return this.httpClient.get(`${this.API_URL}/retrieve-Offer/${idmessage}`)
      }
}
