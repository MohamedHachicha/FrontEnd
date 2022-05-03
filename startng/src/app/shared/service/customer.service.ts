import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CustomerService {

    readonly API_URL = '/api/PIDEV_GARANTIA';

    constructor(private httpClient: HttpClient) {
    }

    getAllSinister() {
        return this.httpClient.get(`${this.API_URL}/Sinister/retrieve-all-sinisters`);
    }

    getSinisterbyId() {
        return this.httpClient.get(`${this.API_URL}/Sinister/retrieve-sinister`);
    }

    addSinister(sinister: any) {
        return this.httpClient.post(`${this.API_URL}/Sinister/add-sinister`, sinister);
    }

    editSinister(id, data) {
        return this.httpClient.put(`${this.API_URL}/Sinister/update-Sinister/` + id, data);
    }

    deleteSinister(idSinister: any) {
        return this.httpClient.delete(`${this.API_URL}/Sinister/delete-Sinister/${idSinister}`);
    }

    treatSinister(idSinister: any): Observable<any> {
        return this.httpClient.get(`${this.API_URL}  /Sinister/traiterSinistre`, idSinister);
    }

    suivreSinister(idSinister: any): Observable<any> {
        return this.httpClient.get(`${this.API_URL}  /Sinister/suivreSinistre`, idSinister);
    }

    verfiferDelay(idSinister: any): Observable<any> {
        return this.httpClient.get(`${this.API_URL}  /Sinister/verificationSinisterDelay`, idSinister);
    }

    calculRapidité(idSinister: any): Observable<any> {
        return this.httpClient.get(`${this.API_URL}  /Sinister/calcul-Rapidité`, idSinister);
    }


}
