import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private apiUrl = 'http://192.168.0.7:8080/tickets';

  constructor(private http: HttpClient) {}

  getTickets(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }


  private apiUrl1 = 'http://192.168.0.7:8080/schedule';

  scheduleMeeting(ticketId: number, startTime: string, duration: string): Observable<any> {
    const payload = {
      ticketId,
      startTime,
      duration
    };
    return this.http.post<any>(this.apiUrl1, payload);
  }



  // live chat
  private baseUrl = 'http://192.168.0.7:8080';

  

  getChatHistory(apiKey: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/${apiKey}`);
  }

  sendMessage(apiKey: string, ticketId: string, message: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/admin/send`, {
      apiKey,
      ticketId,
      message
    });
  }


  // meetings get 
  private apiUrl2 = 'http://192.168.0.7:8080/meetings/upcoming';

  getMeetings(): Observable<any> {
    return this.http.get<any>(this.apiUrl2);
  }
}
