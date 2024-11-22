import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FeaturesService } from 'src/app/Services/features.service';
import { UsermanagementService } from 'src/app/Services/usermanagement.service';

@Component({
  selector: 'app-addfeatures',
  templateUrl: './addfeatures.component.html',
  styleUrls: ['./addfeatures.component.css']
})
export class AddfeaturesComponent implements OnInit {
 
 
  ngOnInit(): void {
    this.fetchNotifications();
    this.fetchUsers();
  }

  users: any;

  notifications: any = []; // No interface needed

  currentDiv: number = 1; // Default to showing the first div
  
  showForm1 = true;           // Initially show Form 1
  showForm2 = false;          // Hide Form 2 initially

  isSingleUserActive = false; // Track single user toggle state
  isAllUsersActive = false;   // Track all users toggle state

  showDiv(divNumber: number): void {
    this.currentDiv = divNumber; // Update the currentDiv to show
  }

  toggleSingleUser() { 
    this.isSingleUserActive = !this.isSingleUserActive;
    this.isAllUsersActive = false;
    this.showForm1 = this.isSingleUserActive;
    this.showForm2 = !this.isSingleUserActive;
  }


  toggleAllUsers() {
    this.isAllUsersActive = !this.isAllUsersActive;
    this.isSingleUserActive = false;
    this.showForm1 = !this.isAllUsersActive;
    this.showForm2 = this.isAllUsersActive;
  }
  
  featureForm: FormGroup;
  featureForm1: FormGroup;

  constructor(
    private fb: FormBuilder,
    private featureNotificationService: FeaturesService,private userService: UsermanagementService
  ) {
    this.featureForm = this.fb.group({
      message: ['', Validators.required],
      featureDescription: ['', Validators.required]
    });

    // for single user
    this.featureForm1 = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required],
      featureDescription: ['', Validators.required],
    });

    
  }


  // for all user
  notifyFeature() {
    if (this.featureForm.valid) {
      this.featureNotificationService.sendFeatureNotification(this.featureForm.value)
        .subscribe(response => {
          console.log('Notification sent successfully:', response);
        }, error => {
          console.error('Error sending notification:', error);
        });
    }
  }


  // for single user
  notifyFeaturesingle() {
    if (this.featureForm1.valid) {
      const email = this.featureForm1.get('email')?.value;
      const message = this.featureForm1.get('message')?.value;
      const featureDescription = this.featureForm1.get('featureDescription')?.value;
  
      this.featureNotificationService.sendsingleFeatureNotification(email, { message, featureDescription }).subscribe(
        response => {
          alert('Notification sent successfully!!')
          console.log('Notification sent successfully:', response);
        },
        error => {
          console.error('Error sending notification', error);
        }
      );
    }
  }
  


  fetchNotifications() {
    this.featureNotificationService.getNotifications().subscribe(
      (data) => {
        // Check if data is an object and wrap it in an array
        if (data && typeof data === 'object') {
          this.notifications = [data]; // Wrap single object in an array
        } else {
          this.notifications = data; // If it's an array, assign it directly
        }
        console.log('Notifications fetched successfully:', this.notifications);
      },
      (error) => {
        console.error('Error fetching notifications:', error);
      }
    );
  }

  // get all users
  fetchUsers() {
    this.userService.getUsers().subscribe((data:any) => {
      this.users = data.users; // Assuming the API returns an array of users
      console.log("Users List-",this.users);
    });
  }


  @ViewChild('emailInput') emailInput!: ElementRef<HTMLInputElement>;

  // Method to set the email in the input field
  selectedEmail: string | null = null;

  selectSingleUser(user: any) {
    if (this.selectedEmail === user.email) {
      // Deselect if clicking the same user again
      this.selectedEmail = null;
      this.featureForm1.patchValue({ email: '' });
    } else {
      // Set selected email, update form control, and focus on email input field
      this.selectedEmail = user.email;
      this.featureForm1.patchValue({ email: this.selectedEmail });
      setTimeout(() => this.emailInput.nativeElement.focus(), 0); // Ensures it focuses after view updates
    }
  }


}
