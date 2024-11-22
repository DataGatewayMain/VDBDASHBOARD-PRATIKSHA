import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { AnalyticsReportsService } from 'src/app/Services/analytics-reports.service';
import { Feedback, FeedbackService } from 'src/app/Services/feedback.service';
import { format, formatDistanceToNow, isToday } from 'date-fns';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  charts: any;

  constructor(private activeUsersService:AnalyticsReportsService,private feedbackService: FeedbackService){}

  ngOnInit(): void {
    this.activeUsersService.getUserActivity().subscribe(data => {
      this.createChart(data.active.percentage, data.inactive.percentage);
    });
    this.loadFeedback();
  }

  createChart(activePercentage: number, inactivePercentage: number): void {
    this.charts = new Chart('userActivityChart', {
      type: 'doughnut',
      data: {
        labels: ['Active Users', 'Inactive Users'],
        datasets: [
          {
            data: [activePercentage, inactivePercentage],
            backgroundColor: ['#00538C','#E1EBEE'],
            borderWidth: 0 // To remove border around segments
          }
        ]
      },
      options: {
        responsive: true,
        rotation: -90, // Rotate to start at the top
        circumference: 180, // Display only half of the donut chart
        plugins: {
          legend: {
            position: 'top'
          }
        }
      }
    });
  }

  feedbackList: Feedback[] = [];

  loadFeedback(): void {
    this.feedbackService.getFeedback().subscribe({
      next: (data) => {
        // Format createdAt for each feedback item
        this.feedbackList = data.map(feedback => ({
          ...feedback,
          formattedCreatedAt: this.formatCreatedAt(feedback.createdAt)
        }));
      },
      error: (error) => {
        console.error('Error fetching feedback data:', error);
      }
    });
  }

  formatCreatedAt(createdAt: string): string {
    const date = new Date(createdAt);
    const timePart = format(date, 'h:mm a'); // Format as "3:54 PM"
    const datePart = isToday(date) ? 'Today' : format(date, 'MMM d'); // "Today" or "Sep 28"
    const relativeTime = formatDistanceToNow(date, { addSuffix: true }); // "2 hrs ago" or "3 days ago"
    return `${datePart} at ${timePart} - ${relativeTime}`;
  }

}
 

