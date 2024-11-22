import { Component } from '@angular/core';
import { HealthCheckService } from 'src/app/Services/health-check.service';

@Component({
  selector: 'app-systemhealth',
  templateUrl: './systemhealth.component.html',
  styleUrls: ['./systemhealth.component.css']
})
export class SystemhealthComponent {

  systemStatus: any ;
  healthStatus: any;

  constructor(private healthService: HealthCheckService) {}

  ngOnInit(): void {
    this.checkSystemHealth();
    this.checkHealth(); // Check health status separately for better clarity and performance optimization.
  }

  checkSystemHealth(): void {
    this.healthService.getSystemHealth().subscribe(
      (data: any ) => {
        console.log('Backend API response:', data); // Log backend response to console
        this.systemStatus = data; // Directly set the response to systemStatus (e.g., "UP" or "DOWN")
      },
      (error) => {
        console.error('Error fetching system health:', error);
      }
    );
  }

  checkHealth(): void {
    this.healthService.getHealthCheck().subscribe(
      (data) => {
        this.healthStatus = data;
      },
      (error) => {
        console.error('Error fetching health status:', error);
      }
    );
  }
}
