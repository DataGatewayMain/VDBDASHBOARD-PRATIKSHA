import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { faUser, faBell, faTachometerAlt, faUsers, faCogs, faReceipt, faChartLine, faHeadset, faFileAlt, faWrench, faFolder, faHeartbeat, faCommentAlt} from '@fortawesome/free-solid-svg-icons';
import { AnalyticsReportsService } from './Services/analytics-reports.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(public router: Router, private activityLogService: AnalyticsReportsService) {} // Ensure the constructor is public
  ngOnInit(): void {

    // this.router.events.subscribe((event) => {
    //   if (event instanceof NavigationEnd) {
    //     const currentUrl = event.urlAfterRedirects;
    //     console.log('Current route URL:', currentUrl); // Debug: Check if URL is captured correctly

    //     const trackingId = 'G-CGYJ7R5W0V'; // Use the required tracking ID

    //     // Call the API with the trackingId and currentUrl as query parameters using POST
    //     this.activityLogService.logPageActivity(trackingId, currentUrl).subscribe({
    //       next: (response) => {
    //         console.log('API response:', response);
    //       },
    //       error: (error) => {
    //         console.error('Error logging activity:', error);
    //       },
    //     });
    //   }
    // });
  
  }

  faUser = faUser;       // Profile icon
  faBell = faBell;       // Notification icon
  faTachometerAlt = faTachometerAlt;
  faUsers = faUsers;
  faCogs = faCogs;
  faReceipt = faReceipt;
  faChartLine = faChartLine;
  faHeadset = faHeadset;
  faFileAlt = faFileAlt;
  faWrench = faWrench;
  faFolder = faFolder;
  faHeartbeat = faHeartbeat;
  faCommentAlt = faCommentAlt;

  
  title = 'vectordb-admin-dashboard';

  isSidebarOpened = true; // Start with the sidebar opened by default
 
  toggleSidebar() {
    this.isSidebarOpened = !this.isSidebarOpened; // Toggle the sidebar state
  }

  isUserSubMenuOpen = false;  // Track submenu state

  toggleUserSubMenu() {
    this.isUserSubMenuOpen = !this.isUserSubMenuOpen;  // Toggle the visibility of the submenu
  }

  isSubscriptionSubMenuOpen = false;  // Track submenu state

  togglesubscriptionSubMenu() {
    this.isSubscriptionSubMenuOpen = !this.isSubscriptionSubMenuOpen;  // Toggle the visibility of the submenu
  } 

  showNotifications = false;
  showProfile = false;
  notificationCount = 3; // Example count, you can dynamically update this value

  toggleNotifications() {
    this.showNotifications = !this.showNotifications;
    this.showProfile = false; // Close profile if open
  }

  toggleProfile() {
    this.showProfile = !this.showProfile;
    this.showNotifications = false; // Close notifications if open
  }

  isContentOpen: boolean = false;

  toggleContent(){
    this.isContentOpen = !this.isContentOpen;
  
  }

  isSupport: boolean = true;

  toggleSupport(){
    this.isSupport = !this.isSupport;
  }
  

}
