import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private readonly BASE_URL = 'http://127.0.0.1:4201';

  constructor(private http: HttpClient) { }

  async getProjects(): Promise<any> {
    try {
      return await this.http.get(this.BASE_URL + '/projects/').toPromise();
    } catch (error) {
      return [];
    }
  }

  async getProjectByName(name: string): Promise<any> {
    try {
      return await this.http.get(this.BASE_URL + '/projects/' + name).toPromise();
    } catch (error) {
      console.error(error);
    }
  }


  async createProject(body: any): Promise<any> {
    return this.http.post(this.BASE_URL + '/projects/', body).toPromise();
  }

  async deleteProject(name: string): Promise<any> {
    return this.http.delete(this.BASE_URL + '/projects/' + name).toPromise();
  }

}