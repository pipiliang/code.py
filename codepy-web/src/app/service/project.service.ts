import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: HttpClient) { }

  async getProjects(): Promise<any> {
    try {
      return await this.http.get('http://192.168.1.106:3001/projects/').toPromise();
    } catch (error) {

    }

  }

}