import { Component } from '@angular/core';
import { TicketService } from 'src/app/Services/ticket.service';
import { TicketDialogComponent } from '../ticket-dialog/ticket-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MeetupdateDialogueComponent } from '../meetupdate-dialogue/meetupdate-dialogue.component';

@Component({
  selector: 'app-meetings',
  templateUrl: './meetings.component.html',
  styleUrls: ['./meetings.component.css']
})

export class MeetingsComponent {
  tickets: any[] = [];
  isLoading = true;
  searchTerm: any;
  displayedTickets: any;


  constructor(private meetingService: TicketService,private dialog:MatDialog) {}

  ngOnInit(): void {
    this.meetingService.getMeetings().subscribe({
      next: (data) => {
        this.tickets = data;
        this.displayedTickets = [...this.tickets]; // Show filtered tickets by default
        this.isLoading = false;
        
      },
      error: (err) => {
        console.error('Error fetching meetings:', err);
        this.isLoading = false;
      },
    });
  }

  joinMeeting(link: string): void {
    if (link) {
      window.open(link, '_blank'); // Opens the link in a new tab
    } else {
      alert('Meeting link is not available.');
    }
  }


  openTicketDialog(ticket: any): void {
    this.dialog.open(MeetupdateDialogueComponent, {
      width: '500px',
      height: '500px',
      data: ticket, // Pass the entire meeting object or only necessary fields
    });
  }
  
  // Method to apply search filter on filteredTickets
  applySearch(): void {
  const searchLower = this.searchTerm.toLowerCase(); // Case-insensitive search
  this.displayedTickets = this.tickets.filter((ticket: any) => {
    const matchesTicketId = ticket.ticketId.toString().includes(searchLower); // Search in ticketId
    const matchesFirstName = ticket.participantFirstName?.toLowerCase().includes(searchLower); // Search in firstName
    return matchesTicketId || matchesFirstName;
  });
  } 

}
