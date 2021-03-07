import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URLs } from '../common/const';
import { FileTreeOperateEvent } from '../core/file.eventhub';

@Injectable({
    providedIn: 'root'
})
export class FileService {

    constructor(private http: HttpClient) { }

    // async getFile(body: { projectName: any; path: string; }): Promise<any> {
    //     try {
    //         return await this.http.post(URLs.BASE_URL + '/files', body).toPromise();
    //     } catch (error) {
    //         console.error(error);
    //     }
    // }

    /**
     * 文件操作接口，统一用一个，偷懒
     * @param body body体和FileTreeOperateEvent一致
     */
    async handleFile(body: FileTreeOperateEvent): Promise<any> {
        try {
            return await this.http.post(URLs.BASE_URL + '/files', body).toPromise();
        } catch (error) {
            console.error(error);
        }
    }

}
