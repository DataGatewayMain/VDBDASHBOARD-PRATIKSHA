import { ChangeDetectorRef, Component , OnInit  } from '@angular/core';
// import { faEye, faPencilAlt, faTrashAlt , faUser, faBell} from '@fortawesome/free-solid-svg-icons';
import { UsermanagementService } from 'src/app/Services/usermanagement.service';
import { faTrash ,faEye,faPencilAlt} from '@fortawesome/free-solid-svg-icons'; // Import the icon
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})

export class UserListComponent implements OnInit {
 
  users: any ;
  searchText: string = ''; // Bind this to the search input
  faTrash = faTrash; // Make the icon available in your component
  faEye = faEye;
  faPencilAlt = faPencilAlt;

  constructor(private userService: UsermanagementService,private library: FaIconLibrary , private router:Router) {
    this.library.addIcons(faTrash,faEye,faPencilAlt);
  }

  ngOnInit(): void {
    this.userService.getUsers().subscribe((data:any) => {
      this.users = data.users; // Assuming the API returns an array of users
      console.log("Users List-",this.users);
    });
  } 

  link(apiKey: any): void {
    // Navigate to the user-details route and pass apiKey as a route parameter
    this.router.navigate(['/user-details', apiKey]);
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
      user.status.toLowerCase().includes(this.searchText.toLowerCase()) ||
      (user.city && user.city.toLowerCase().includes(this.searchText.toLowerCase())) ||
      (user.state && user.state.toLowerCase().includes(this.searchText.toLowerCase())) 
      
    );
  }

  
}
