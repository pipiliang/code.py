import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URLs } from '../common/const';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: HttpClient) { }

  async getProjects(): Promise<any> {
    try {
      return await this.http.get(URLs.BASE_URL + '/projects/').toPromise();
    } catch (error) {
      return [];
    }
  }

  async getProjectByName(name: string): Promise<any> {
    try {
      return await this.http.get(URLs.BASE_URL + '/projects/' + name).toPromise();
    } catch (error) {
      console.error(error);
    }
  }


  async createProject(body: any): Promise<any> {
    return this.http.post(URLs.BASE_URL + '/projects/', body).toPromise();
  }

  async deleteProject(name: string): Promise<any> {
    return this.http.delete(URLs.BASE_URL + '/projects/' + name).toPromise();
  }

}