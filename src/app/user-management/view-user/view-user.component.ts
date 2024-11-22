import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faEye, faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons';
import { UsermanagementService } from 'src/app/Services/usermanagement.service';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css']
})
export class ViewUserComponent {

  apiKey: any ;
  data: any;
  data1:any;

  constructor(private route: ActivatedRoute,private apiService:UsermanagementService) {}

  ngOnInit(): void {
    // Retrieve the apiKey from the URL
    this.route.paramMap.subscribe(params => {
      this.apiKey = params.get('apiKey');
      console.log("API Key:", this.apiKey);

      if (this.apiKey) {
        // Fetch data using the service
        this.fetchData(this.apiKey);
      }

      if (this.apiKey) {
        // Fetch data using the service and send tableName in the body
        this.usertableData(this.apiKey);
      }
    });
  }

  // Function to fetch data using the ApiService
  fetchData(apiKey: string): void {
    this.apiService.getDatabyusers(apiKey).subscribe(
      response => {
        this.data = response;
        console.log('Fetched Data:', this.data);
      },
      error => {
        console.error('Error fetching data:', error);
      }
    );
  }

  usertableData(tableName: string): void {
    this.apiService.getDatabyuserstable(tableName).subscribe(
      response => {
        this.data1 = response;
        console.log('user table Data:', this.data1);
      },
      error => {
        console.error('Error fetching data1:', error);
      }
    );
  }

}
