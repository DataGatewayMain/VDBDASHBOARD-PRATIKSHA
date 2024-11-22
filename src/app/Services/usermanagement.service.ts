import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsermanagementService {

  private apiUrl = 'http://192.168.0.7:8080/users';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  // Method to fetch data using the API key
  getDatabyusers(apiKey: string): Observable<any> {
    const apiUrl = `http://192.168.0.7:8080/users/${apiKey}`;  // Replace with your actual API URL
    return this.http.get(apiUrl);  // Returning the observable
  }

  private usertableusl = 'http://192.168.0.7:8080/getuserdetails'; // API URL
  
  // Method to make a POST request with tableName in the body
  getDatabyuserstable(tableName: string): Observable<any> {
    const body = { tableName };  // Request body
    return this.http.post(this.usertableusl, body);  // Making the POST request
  }

 
  // invite single users
  inviteUser(email: string): Observable<any> {
    const apiUrl = `http://192.168.0.7:8080/users/invite/${email}`;
    return this.http.post(apiUrl, {}, { responseType: 'text' });
  }

  // invite all users
  inviteallUsers():Observable<any>{
    const apiUrl = 'http://192.168.0.7:8080/users/invite';
    return this.http.get(apiUrl, { responseType: 'text' }); 
  }

  // user purmissions
  private apiUri = 'http://192.168.0.7:8080/credits/zero';


  getUserszero(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUri);
  }
}
