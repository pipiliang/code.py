import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private readonly BASE_URL = 'http://192.168.1.106:4201';

  constructor(private http: HttpClient) { }

  async getProjects(): Promise<any> {
    try {
      return await this.http.get(this.BASE_URL + '/projects/').toPromise();
    } catch (error) {
      return [];
    }

  }

  async createProject(body: any): Promise<any> {
    return this.http.post(this.BASE_URL + '/projects/', body).toPromise();
  }

  deleteProject(name: string): Promise<any> {
    return this.http.delete(this.BASE_URL + '/projects/' + name).toPromise();
  }

}