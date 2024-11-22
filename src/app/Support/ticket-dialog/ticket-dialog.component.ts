import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AdminChatboxComponent } from 'src/app/admin-chatbox/admin-chatbox.component';

@Component({
  selector: 'app-ticket-dialog',
  templateUrl: './ticket-dialog.component.html',
  styleUrls: ['./ticket-dialog.component.css']
})
export class TicketDialogComponent {
  responseText = '';
  status = 'pending';
  
 
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<TicketDialogComponent>,
    private http: HttpClient,public dialog: MatDialog
  ) {}

  close(): void {
    this.dialogRef.close();
  }

  submitResponse(): void {
    const apiUrl = `http://192.168.0.7:8080/tickets/${this.data.ticketId}/respond`;
    
    const requestBody = {
      status: this.status,
      response: this.responseText
    };

    this.http.put(apiUrl, requestBody).subscribe({
      next: (res: any) => {
        console.log('Response submitted:', res);
        alert('Response submitted successfully');
        this.dialogRef.close(res);
      },
      error: (err: any) => {
        console.error('Error submitting response:', err);
        alert('Error submitting response');
      }
    });
  }
  

  isModalOpen = false;
  isResponseModalOpen = false;
  apiResponseMessage = '';  // Stores the response message
  meetingDetails = {
    ticketId: null,
    firstName:'',
    startTime: '',
    duration: ''
  };

  openSchedulePopup() {
   // Populate meetingDetails with data
  this.meetingDetails.ticketId = this.data.ticketId;
  this.meetingDetails.firstName = this.data.firstName;

  // Open the modal
  this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  closeResponseModal() {
    this.isResponseModalOpen = false;
  }

  scheduleMeeting() {
    const apiUrl = 'http://192.168.0.7:8080/schedule';

    // Specify responseType: 'text' to handle a plain text response
    this.http.post(apiUrl, this.meetingDetails, { responseType: 'text' }).subscribe(
      (response: string) => {
        this.apiResponseMessage = response;  // Store the plain text response (URL)
        this.isModalOpen = false;
        this.isResponseModalOpen = true;
      },
      (error) => {
        console.error('Error scheduling meeting:', error);
      }
    );
  }

  copyToClipboard(text: string) {
    navigator.clipboard.writeText(text).then(
      () => {
        alert('Link copied to clipboard!');
      },
      (error) => {
        console.error('Failed to copy the link:', error);
      }
    );
  }


  openChatboxDialog(): void {
    const dialogRef = this.dialog.open(AdminChatboxComponent, {
      width: '300px',
      height: '400px'
    });

    // Reload chat history when dialog opens
    dialogRef.afterClosed().subscribe(() => {
      // Reload chat history when dialog is closed if you want to refresh it on reopening
    });
  }


  openChat(): void {
   
    this.dialog.open(AdminChatboxComponent, {
      width: '400px',
      height: '500px',
      data: { receiverId: localStorage.getItem('api_key') },
    });
  }
}
