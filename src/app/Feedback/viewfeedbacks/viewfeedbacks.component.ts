import { Component } from '@angular/core';
import { Feedback, FeedbackService } from 'src/app/Services/feedback.service';

@Component({
  selector: 'app-viewfeedbacks',
  templateUrl: './viewfeedbacks.component.html',
  styleUrls: ['./viewfeedbacks.component.css']
})
export class ViewfeedbacksComponent {

  feedbackList: Feedback[] = [];

  constructor(private feedbackService: FeedbackService) {}

  ngOnInit(): void {
    this.loadFeedback();
  }

  loadFeedback(): void {
    this.feedbackService.getFeedback().subscribe({
      next: (data: Feedback[]) => {
        this.feedbackList = data;
      },
      error: (error) => {
        console.error('Error fetching feedback data:', error);
      }
    });
  }

}
