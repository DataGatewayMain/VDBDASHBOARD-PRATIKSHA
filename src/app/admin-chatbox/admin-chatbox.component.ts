import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { TicketService } from '../Services/ticket.service';
import { HttpClient } from '@angular/common/http';
import { io } from 'socket.io-client';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-admin-chatbox',
  templateUrl: './admin-chatbox.component.html',
  styleUrls: ['./admin-chatbox.component.css']
})
export class AdminChatboxComponent implements  OnInit {
  // chatHistory: any[] = [];  // Ensure chatHistory is an array
  // newMessage = '';
  // apiKey = '';



  // constructor(private chatboxService: TicketService) {}

  // ngOnInit(): void {
  //   this.apiKey = localStorage.getItem('api_key') || '';
  //   this.loadChatHistory();
  // }

  // loadChatHistory(): void {
  //   if (this.apiKey) {
  //     this.chatboxService.getChatHistory(this.apiKey).subscribe(
  //       (history: any[]) => {
  //         this.chatHistory = history;  // Update chatHistory array
  //         console.log("Chat history loaded:", history);  // Log to confirm data
  //       },
  //       (error) => {
  //         console.error("Error loading chat history", error);
  //       }
  //     );
  //   }
  // }

  // sendMessage(): void {
  //   if (this.newMessage.trim()) {
  //     this.chatboxService.sendMessage(this.apiKey, localStorage.getItem('ticketId') || '', this.newMessage)
  //       .subscribe(response => {
  //         this.chatHistory.push({ content: this.newMessage });  // Add message to chatHistory
  //         this.newMessage = '';  // Reset input field
  //       });
  //   }
  // }
  messages: any[] = [];
  newMessage = '';
  socket: any;
  userId = 'admin'; // Admin sender ID
  receiverId :any ; // User receiver ID
  firstName: any  ;

  constructor(private http: HttpClient,  private dialogRef: MatDialogRef<AdminChatboxComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      // this.receiverId = data.receiverId;
    }

  ngOnInit(): void {
        // Fetch the receiverId (user ID) from localStorage
         this.firstName = localStorage.getItem('firstName') || '';

      // Fetch the receiverId (user ID) from localStorage
      this.receiverId = localStorage.getItem('api_key') || '';
      if (!this.receiverId) {
        alert('Receiver ID not found. Please ensure the "api_key" is stored in localStorage.');
        return;
      }

    this.socket = io('http://localhost:5000'); // Backend server URL
    this.fetchMessages();
    this.socket.on('newMessage', (message: any) => {
      if (message.sender === this.userId || message.receiver === this.userId) {
        this.messages.push(message);
      }
    });
  }

  fetchMessages(): void {
    this.http.get<any[]>(`http://localhost:5000/api/messages`, {
      params: { sender: this.userId, receiver: this.receiverId },
    }).subscribe((data) => {
      this.messages = data;
    });
  }

  sendMessage(): void {
    const messagePayload = {
      sender: this.userId,
      receiver: this.receiverId,
      message: this.newMessage,
    };

    this.http.post<any>('http://localhost:5000/api/messages', messagePayload).subscribe(() => {
      this.newMessage = '';
    });
  }

  closeChat(): void {
    this.dialogRef.close();
  }
}