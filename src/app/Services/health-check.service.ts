import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HealthCheckService {

  private apiUrl = 'http://192.168.0.7:8080/health';
  private apiUrl1 = 'https://awsbackendapi-vdb.live/v1/health/check';


  constructor(private http: HttpClient) {}

  getSystemHealth(): Observable<string> { 
    return this.http.get(this.apiUrl, { responseType: 'text' });
  }


  getHealthCheck(): Observable<any> {
    return this.http.get<any>(this.apiUrl1);
  }

  
}
