import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class FileService {
    private readonly BASE_URL = 'http://127.0.0.1:4201';

    constructor(private http: HttpClient) { }

    async getFile(body): Promise<any> {
        try {
            return await this.http.post(this.BASE_URL + '/files', body).toPromise();
        } catch (error) {
            console.error(error);
        }
    }

}