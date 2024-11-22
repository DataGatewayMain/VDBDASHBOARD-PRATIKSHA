import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class FeaturesService {

  private apiUrl = 'http://192.168.0.7:8080/notifyfeature';

  constructor(private http: HttpClient) { }

  sendFeatureNotification(body: { message: string; featureDescription: string }): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this.apiUrl, body, { headers });
  }


  // private apiUrl1 = `http://192.168.0.7:8080`;

 
  sendsingleFeatureNotification(email: string, data: any) {
    const url = `http://192.168.0.7:8080/${email}/notifyfeature`;
    return this.http.post(url, data, { responseType: 'text' });
  }
  

  private apiUrl2 = 'http://192.168.0.7:8080/recent';

  getNotifications(): Observable<any> {   
    return this.http.get(this.apiUrl2);
  }
}


