import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Feedback {
  additionalFeedback: string;
  apiKey: string;
  email: string;
  feedbackType: string;
  firstName: string;
  createdAt: string;
  formattedCreatedAt?: string; // Add this optional property
}

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  private apiUrl = 'http://192.168.0.7:8080/feedback';

  constructor(private http: HttpClient) { }

  getFeedback(): Observable<Feedback[]> {
    return this.http.get<Feedback[]>(this.apiUrl);
  }
}
