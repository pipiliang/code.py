import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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

    }

  }

  async createProject(body: any): Promise<any> {
    return await this.http.post(this.BASE_URL + '/project/', body).toPromise();
  }

  async deleteProject(name: string): Promise<any> {
    return await this.http.delete(this.BASE_URL + '/project/{name}').toPromise();
  }

}