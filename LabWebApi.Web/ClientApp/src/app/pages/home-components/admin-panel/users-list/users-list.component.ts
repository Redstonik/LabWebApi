import { Component, OnInit } from '@angular/core';
import { AuthorizationRoles } from 'src/app/configs/auth-roles';
import { UserInfo } from 'src/app/core/models/admin/UserInfo';
import { AdminService } from 'src/app/core/services/Admin.service';
import { AlertService } from 'src/app/core/services/Alert.service';
import { EditUserDialogComponent } from 'src/app/pages/home-components/admin-panel/edit-user-dialog/edit-user-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  users: UserInfo[];

  constructor(private adminService: AdminService,
    private alertService: AlertService, private dialog: MatDialog) { }

  async ngOnInit() {
    this.adminService.getUsers().subscribe((data: UserInfo[]) => this.users =
      data);
  }
  isAdminRole(user: UserInfo): boolean {
    return user.role == AuthorizationRoles.Admin;
  }
  async editUser(user: UserInfo) {
    const dialogRef = this.dialog.open(EditUserDialogComponent, {
      data: { ...user }
    });
    dialogRef.afterClosed().subscribe((result: UserInfo) => {
      if (result) {
        this.adminService.editUser(result).subscribe((data: any) => {
          let modelIndex = this.users.findIndex((x: any) => x.id == data.id);
          if (modelIndex !== -1) {
            this.users.splice(modelIndex, 1, data);
            this.users = [...this.users];
          } else {
            this.alertService.errorAlert("Update User", "Failed!");
          }
        });
      }
    });
  }
  async deleteUser(userId: any) {
    const confirmed = await this.alertService.okCancalAlert(`Do you really want 
    to delete this user?`);
    if (confirmed) {
      this.adminService.deleteUser(userId).subscribe(() => {
        const newList = this.users.filter(item => item.id == userId);
        this.users = newList;
      });
    }
  }
}
