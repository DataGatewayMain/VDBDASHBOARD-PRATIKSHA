import { Component , OnInit, ElementRef, ViewChild} from '@angular/core';
import { Chart } from 'chart.js/auto';
import { AnalyticsReportsService } from 'src/app/Services/analytics-reports.service';
import * as moment from 'moment'; // Import moment.js for date formatting



@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css']
})
export class AnalyticsComponent {
  weeklyData: any[] = [];
  allMonthsData: any[] = [];
  chart: any;
  activities: any;
  charts: any ;


  constructor(private activeUsersService: AnalyticsReportsService) {}

  ngOnInit(): void {
    this.activeUsersService.getActiveUsers().subscribe((data) => {
      this.weeklyData = this.aggregateDataByMonth(data.weeklyActiveUsers);
      this.allMonthsData = this.aggregateDataByMonth(data.allMonthsActiveUsers);
      this.drawChart(); // Call the function to draw the chart
    });

    this.fetchActivityData();

    this.activeUsersService.getUserActivity().subscribe(data => {
      this.createChart(data.active.percentage, data.inactive.percentage);
    });

    this.linegraph();
  }

  createChart(activePercentage: number, inactivePercentage: number): void {
    this.charts = new Chart('userActivityChart', {
      type: 'doughnut',
      data: {
        labels: ['Active Users', 'Inactive Users'],
        datasets: [
          {
            data: [activePercentage, inactivePercentage],
            backgroundColor: ['#4CAF50', '#F44336'],
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
  
  // Aggregate user count by month
  aggregateDataByMonth(data: any[]): { month: string; userCount: number }[] {
    const aggregated: { [key: string]: number } = {}; // Define aggregated as an object with string keys and number values

    data.forEach(item => {
      // Combine year and month for unique month identification
      const monthYear = item.year && item.month ? `${moment().month(item.month - 1).format('MMM')} ${item.year}` : null;
      if (monthYear) {
        aggregated[monthYear] = (aggregated[monthYear] || 0) + (item.userCount || 0); // Ensure userCount is treated as number
      }
    });

    return Object.entries(aggregated).map(([month, userCount]) => ({ month, userCount }));
  }

  drawChart() {
    const labels = this.getAllMonths(); // Get all months for the X-axis
    const allMonthsCounts = this.getCountsForMonths(labels, this.allMonthsData);

    if (this.chart) {
      this.chart.destroy(); // Destroy any existing chart before drawing a new one
    }

    this.chart = new Chart('activeUsersChart', {
      type: 'bar',
      data: {
        labels: labels, // Set months as labels for X-axis
        datasets: [
          {
            label: 'All Months Active Users',
            data: allMonthsCounts,
            backgroundColor: this.getColors(allMonthsCounts.length), // Set colors dynamically
            borderColor: 'rgba(0, 123, 255, 1)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'User Count',
            },
          },
          x: {
            title: {
              display: true,
              text: 'Months',
            },
          },
        },
        plugins: {
          tooltip: {
            callbacks: {
              label: (context) => {
                const userCount = context.raw;
                return `User Count: ${userCount}`;
              },
            },
          },
        },
      },
    });
  }

  // Get a list of all months for X-axis
  getAllMonths(): string[] {
    const months = moment.monthsShort(); // Get short names of all months
    return months.map(month => `${month} 2024`); // Adjust year as needed
  }

  // Get counts for the corresponding months
  getCountsForMonths(labels: string[], data: { month: string; userCount: number }[]): number[] {
    return labels.map(label => {
      const monthData = data.find(d => `${d.month}` === label);
      return monthData ? monthData.userCount : 0; // Return count or 0 if no data
    });
  }

  // Generate a color array for each bar based on the count
  getColors(count: number): string[] {
    const colors: string[] = [];
    const colorPalette = [
      'rgba(255, 99, 132, 0.5)',
      'rgba(54, 162, 235, 0.5)',
      'rgba(255, 206, 86, 0.5)',
      'rgba(75, 192, 192, 0.5)',
      'rgba(153, 102, 255, 0.5)',
      'rgba(255, 159, 64, 0.5)',
      // Add more colors if needed
    ];
    
    for (let i = 0; i < count; i++) {
      colors.push(colorPalette[i % colorPalette.length]); // Loop through colors
    }

    return colors;
  }

  fetchActivityData(): void {
    this.activeUsersService.getAllActivity().subscribe((data) => {
      this.activities = data;
    });
  }

  currentPage: number = 1;
  pageSize: number = 10; // Number of records per page

  get paginatedActivities() {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.activities.slice(start, start + this.pageSize);
  }

  changePage(page: number): void {
    this.currentPage = page;
  }


  // line chart
  @ViewChild('lineChart') lineChartRef!: ElementRef;
  private lineChart: any;
  createlineChart(data: any[]): void {
    const percentages = data.map(item => parseFloat(item.percentage));
    const labels = data.map(item => item.pageUrl);
    const visitCounts = data.map(item => item.visitCount);

    this.lineChart = new Chart(this.lineChartRef.nativeElement, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Visit Percentage',
          data: percentages,
          borderColor: 'blue',
          fill: false,
          tension: 0.3
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: (value: any) => value + '%'
            }
          }
        },
        plugins: {
          tooltip: {
            callbacks: {
              label: (context: any) => {
                const visitCount = visitCounts[context.dataIndex];
                const pageUrl = labels[context.dataIndex];
                return `Visit Count: ${visitCount}, Page: ${pageUrl}`;
              }
            }
          }
        }
      }
    });
  }

  linegraph(){
    this.activeUsersService.linegraph().subscribe(data => {
      this.createlineChart(data);
  });
   }

}

