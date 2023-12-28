import { Component, OnInit } from '@angular/core';
import { UserInfo } from 'src/app/core/models/admin/UserInfo';
import { AuthorizationRoles } from 'src/app/configs/auth-roles';
import { AuthenticationService } from 'src/app/core/services/Authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  currentUser: UserInfo; // Declare the currentUser property

  cards: any[] = [
    { title: 'Users List', content: 'List of all users in the system', path: 'users-list'},
    { title: 'Products List', content: 'List of all products in the system', path: 'products-list'}
  ];
  constructor(private authService: AuthenticationService) {     // Check authentication and set currentUser
    this.authService.isAuthenticatedWithRefreshToken().then(isAuthenticated => {
      if (isAuthenticated) {
        this.currentUser = this.authService.currentUser as UserInfo;
      }
    });
  }
  ngOnInit() {

  }

  isAdminRole(user: UserInfo): boolean {
    console.log(user);
    return user.role.toString() == "Admin";
  }
}
