import { AlertService } from './Alert.service';
import { catchError, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { usersUrl } from 'src/app/configs/adminController-endpoints';
import { UserInfo } from '../models/admin/UserInfo';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

constructor(private http: HttpClient, private alertService: AlertService) {}

getUsers(): Observable<UserInfo[]>{
  return this.http.get<UserInfo[]>(usersUrl).pipe(
    catchError(err => {
      this.alertService.errorAlert(err.error, "Get Users Failed!");
      return of();
  }));
}

deleteUser(userId: any): Observable<any>{
  return this.http.delete<any>(usersUrl + `/${userId}`).pipe(
    catchError(err => {
      this.alertService.errorAlert(err.error, "Delete User Failed!");
      return of();
  }));
}

editUser(user: UserInfo): Observable<UserInfo>{
  return this.http.put<UserInfo>(usersUrl, user).pipe(
    catchError(err => {
      this.alertService.errorAlert(err, "Edit User Failed!");
      return of();
  }));
}
  
getUserById(userId: UserInfo): Observable<UserInfo[]>{
  return this.http.get<UserInfo[]>(usersUrl + `/${userId}`).pipe(
    catchError(err => {
      this.alertService.errorAlert(err.error, "Get Users Failed!");
      return of();
  }));
}
}

