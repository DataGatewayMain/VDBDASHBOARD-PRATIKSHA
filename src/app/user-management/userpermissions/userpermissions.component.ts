import { Component, OnInit } from '@angular/core';
import { UsermanagementService } from 'src/app/Services/usermanagement.service';

@Component({
  selector: 'app-userpermissions',
  templateUrl: './userpermissions.component.html',
  styleUrls: ['./userpermissions.component.css']
})
export class UserpermissionsComponent implements OnInit {

  users: any[] = []; // Array to store user data

  constructor(private userService: UsermanagementService) {}

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers() {
    this.userService.getUserszero().subscribe(
      (data) => {
        this.users = data;
        console.log('Users fetched successfully:', this.users);
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }

  toggleUserStatus(){

  }

}
