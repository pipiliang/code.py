import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URLs } from '../common/const';

@Injectable({
    providedIn: 'root'
})
export class FileService {

    constructor(private http: HttpClient) { }

    async getFile(body): Promise<any> {
        try {
            return await this.http.post(URLs.BASE_URL + '/files', body).toPromise();
        } catch (error) {
            console.error(error);
        }
    }

}