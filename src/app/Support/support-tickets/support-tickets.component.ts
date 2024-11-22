import { Component } from '@angular/core';
import { TicketService } from 'src/app/Services/ticket.service';
import { MatDialog } from '@angular/material/dialog';
import { TicketDialogComponent } from '../ticket-dialog/ticket-dialog.component';
import { AdminChatboxComponent } from 'src/app/admin-chatbox/admin-chatbox.component';

@Component({
  selector: 'app-support-tickets',
  templateUrl: './support-tickets.component.html',
  styleUrls: ['./support-tickets.component.css']
})
export class SupportTicketsComponent {

  tickets: any ;
  filteredTickets: any[] = [];
  searchTerm: any;
  displayedTickets: any[] = []; // Tickets displayed after search

  constructor(private ticketService: TicketService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.ticketService.getTickets().subscribe(
      (data) => {
        this.tickets = data;
        // Set filteredTickets after tickets is populated
        this.filteredTickets = this.tickets.filter((ticket:any) => ticket.status == 'Open');
        this.displayedTickets = [...this.filteredTickets]; // Show filtered tickets by default
      },
      (error) => console.error('Error fetching tickets', error)
    );
  }

  openTicketDialog(ticket: any): void {

    // Set the ticket.apikey to localStorage
    localStorage.setItem('api_key', ticket.apiKey);

    // Set the ticket.apikey to localStorage
    localStorage.setItem('ticketId', ticket.ticketId);
    
    this.dialog.open(TicketDialogComponent, {
      width: '700px',
      height: '700px',
      data: ticket
    });
  }

 // Method to apply search filter on filteredTickets
applySearch(): void {
  const searchLower = this.searchTerm.toLowerCase(); // Case-insensitive search
  this.displayedTickets = this.filteredTickets.filter((ticket: any) => {
    const matchesTicketId = ticket.ticketId.toString().includes(searchLower); // Search in ticketId
    const matchesFirstName = ticket.firstName?.toLowerCase().includes(searchLower); // Search in firstName
    return matchesTicketId || matchesFirstName;
  });
}

  
  
}
