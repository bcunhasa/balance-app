import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class RestProvider {
  
  // apiUrl = "http://bcunhasa.pythonanywhere.com/api/";
  apiUrl = "http://127.0.0.1:8000/api/";

  constructor(public http: HttpClient) {
  }
  
  public getImage(id: number) {
    return new Promise(resolve => {
      this.http.get(this.apiUrl + 'image/').subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  public postImage(data: any, finalUrl: string) {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + finalUrl, JSON.stringify(data), {
        headers: new HttpHeaders().set('Content-Type', 'application/json')
      }).subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }
  
  public getGallery() {
    return new Promise(resolve => {
      this.http.get(this.apiUrl + 'image/gallery/').subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  public postGalleryItem(data: any) {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + 'image/gallery/', JSON.stringify(data), {
        headers: new HttpHeaders().set('Content-Type', 'application/json')
      }).subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

}
