import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { loadGapiInsideDOM } from 'gapi-script';

interface UserActivityResponse {
  active: { count: number; percentage: number };
  inactive: { count: number; percentage: number };
}


@Injectable({
  providedIn: 'root'
})
export class AnalyticsReportsService {
  
  constructor(private http: HttpClient) {}

  getActiveUsers(): Observable<any> {
    return this.http.get(`http://192.168.0.7:3000/api/active-users`);
  }

  // private apiUrl = 'http://192.168.0.232:8080/activity';

  // logPageActivity(trackingId: string, pageUrl: string): Observable<any> {
  //   console.log('Logging activity with:', { trackingId, pageUrl });
  
  //   let params = new HttpParams()
  //     .set('trackingId', trackingId)
  //     .set('pageUrl', pageUrl);
  
  //   // Ensure you're hitting the correct endpoint
  //   return this.http.post('http://192.168.0.232:8080/activity', {}, { params: params });
  // }

  private apiUrl = 'http://192.168.0.7:8080/allActivity';

  getAllActivity(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  private apiUrl1 = 'http://192.168.0.7:3000/api/user-activity';

  getUserActivity(): Observable<UserActivityResponse> {
    return this.http.get<UserActivityResponse>(this.apiUrl1);
  }

  private apiUrl2 = 'http://192.168.0.7:8080/visitPercentages';

  linegraph():Observable<any>{
    return this.http.get<any>(this.apiUrl2);
  }

}
