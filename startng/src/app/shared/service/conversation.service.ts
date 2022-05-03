import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Conversation } from '../model/conversation';

@Injectable({
  providedIn: 'root'
})
export class ConversationService {
    readonly API_URL = 'http://localhost:8085/PIDEV/conversation';
  
    constructor(private httpClient: HttpClient) { } 
    addConversation(conv : Conversation): Observable<Object> {
        return this.httpClient.post(`${this.API_URL}/add-Conversation`,conv,
        {headers: new HttpHeaders().append("Authorization","Bearer "+localStorage.getItem('token'))})
      }
      editConversation(message : any){
        return this.httpClient.put(`${this.API_URL}/modify-Conversation`, message,
        {headers: new HttpHeaders().append("Authorization","Bearer "+localStorage.getItem('token'))})
      }
      deleteConversation(idmessage : Number)  {
        return  this.httpClient.delete(`${this.API_URL}/remove-Conversation/${idmessage}`,
        {headers: new HttpHeaders().append("Authorization","Bearer "+localStorage.getItem('token'))})
      }
      archiveConversation(idmessage : Number) :Observable<Object> {
        return  this.httpClient.put(`${this.API_URL}/archive-Conversation`,idmessage,
        {headers: new HttpHeaders().append("Authorization","Bearer "+localStorage.getItem('token'))})
      }
      desarchiveConversation(idmessage : Number) :Observable<Object> {
        return  this.httpClient.put(`${this.API_URL}/desarchive-Conversation`,idmessage,
        {headers: new HttpHeaders().append("Authorization","Bearer "+localStorage.getItem('token'))})
     }
     getConv() {
        return this.httpClient.get(`${this.API_URL}/retrieve-all-Conversations`,
        {headers: new HttpHeaders().append("Authorization","Bearer "+localStorage.getItem('token'))})
      }
      
      getmessages(id: Number) {
        return this.httpClient.get(`${this.API_URL}/retrieve-conversation/${id}`,
        {headers: new HttpHeaders().append("Authorization","Bearer "+localStorage.getItem('token'))})
      }
      
      getConversation(id: Number) {
        return this.httpClient.get(`${this.API_URL}"/retrieve-Conversation/${id}"`,
        {headers: new HttpHeaders().append("Authorization","Bearer "+localStorage.getItem('token'))})
      }
}
