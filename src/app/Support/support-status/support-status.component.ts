import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TicketService } from 'src/app/Services/ticket.service';
import { TicketDialogComponent } from '../ticket-dialog/ticket-dialog.component';

@Component({
  selector: 'app-support-status',
  templateUrl: './support-status.component.html',
  styleUrls: ['./support-status.component.css']
})
export class SupportStatusComponent {

  tickets: any[] = [];
  searchTerm: any;
  displayedTickets: any;

  constructor(private ticketService: TicketService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.ticketService.getTickets().subscribe(
      (data) => {
        this.tickets = data.filter((ticket:any) => ticket.status !== 'Open');
        this.displayedTickets = [...this.tickets]; // Show filtered tickets by default
      },
      (error) => console.error('Error fetching tickets', error)
    );
  }
  

  openTicketDialog(ticket: any): void {
       // Set the ticket.apikey to localStorage
       localStorage.setItem('api_key', ticket.apiKey);

       // Set the ticket.apikey to localStorage
       localStorage.setItem('ticketId', ticket.ticketId);

      //  set the ticket.firstName to localstorage 
      localStorage.setItem('firstName',ticket.firstName)

    this.dialog.open(TicketDialogComponent, {
      width: '700px',
      height: '700px',
      data: ticket
    });
  }

  // Method to apply search filter on filteredTickets
applySearch(): void {
  const searchLower = this.searchTerm.toLowerCase(); // Case-insensitive search
  this.displayedTickets = this.tickets.filter((ticket: any) => {
    const matchesTicketId = ticket.ticketId.toString().includes(searchLower); // Search in ticketId
    const matchesFirstName = ticket.firstName?.toLowerCase().includes(searchLower); // Search in firstName
    return matchesTicketId || matchesFirstName;
  });
}


  

  
}
