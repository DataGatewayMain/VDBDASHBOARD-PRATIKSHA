import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faEye, faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons';
import { UsermanagementService } from 'src/app/Services/usermanagement.service';

@Component({
  selector: 'app-invite-user-list',
  templateUrl: './invite-user-list.component.html',
  styleUrls: ['./invite-user-list.component.css']
})
export class InviteUserListComponent implements OnInit {

  users: any ;
  selectedUsers: any[] = [];

  faTrash = faTrash; // Make the icon available in your component
  faEye = faEye;
  faPencilAlt = faPencilAlt;
  searchText: any;

  constructor(private userService: UsermanagementService,private library: FaIconLibrary , private router:Router) {
    this.library.addIcons(faTrash,faEye,faPencilAlt);
  }


  
ngOnInit(): void {
  
  this.userService.getUsers().subscribe((data: any) => {
    // Filter users with status 'Inactive'
    this.users = data.users.filter((user: any) => user.status === 'Inactive');
    console.log("Inactive Users List:", this.users);
  });
 
}

filteredUsers() {
  // Filter the users based on searchText
  if (!this.searchText) {
    return this.users;
  }
  return this.users.filter((user:any) =>
    user.firstName.toLowerCase().includes(this.searchText.toLowerCase()) ||
    user.lastName.toLowerCase().includes(this.searchText.toLowerCase()) ||
    user.email.toLowerCase().includes(this.searchText.toLowerCase()) ||
    (user.city && user.city.toLowerCase().includes(this.searchText.toLowerCase())) ||
    (user.state && user.state.toLowerCase().includes(this.searchText.toLowerCase())) ||
    user.status.toLowerCase().includes(this.searchText.toLowerCase())
  );
}


// invite all useres on one click

inviteallUser(){
  this.userService.inviteallUsers().subscribe(
    response => {
      console.log('Response from API:', response); // This will now be the plain text response
      alert(response)
    },
    error => {
      console.error('Error sending invite', error);
    }
  );
}


// invite users personally
inviteUser(email: string) {
  this.userService.inviteUser(email).subscribe(
    response => {
      console.log('Response from API:', response); // This will now be the plain text response
      alert(response)
    },
    error => {
      console.error('Error sending invite', error);
    }
  );
}


// invite selected users 
toggleUserSelection(user: any) {
  if (user.selected) {
    this.selectedUsers.push(user);
  } else {
    this.selectedUsers = this.selectedUsers.filter(u => u.email !== user.email);
  }
  console.log("Selected Users:", this.selectedUsers);
}

selectAllUsers(event: any) {
  this.selectedUsers = event.target.checked ? [...this.users] : [];
  this.users.forEach((user:any ) => (user.selected = event.target.checked));
  console.log("All Selected Users:", this.selectedUsers);
}

sendBulkInvites() {
  const emails = this.selectedUsers.map(user => user.email);
  if (emails.length > 0) {
    emails.forEach(email => {
      this.inviteUser(email);
    });
    alert("Invites sent to selected users!");
    this.selectedUsers = []; // Clear selection after sending invites
  } else {
    alert("No users selected for invitation.");
  }

}










}
