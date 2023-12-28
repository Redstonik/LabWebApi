import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { FormGroup } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserInfo } from 'src/app/core/models/admin/UserInfo';
import { InputValidationService } from
  'src/app/core/services/InputValidation.service';
import { AuthorizationRoles } from 'src/app/configs/auth-roles';
@Component({
  selector: 'app-edit-user-dialog',
  templateUrl: './edit-user-dialog.component.html',
  styleUrls: ['./edit-user-dialog.component.css']
})
export class EditUserDialogComponent implements OnInit {
  formGroup: FormGroup;
  constructor(private dialogRef: MatDialogRef<EditUserDialogComponent>,
    public validationService: InputValidationService,
    @Inject(MAT_DIALOG_DATA) public data: UserInfo,
    private formBuilder: RxFormBuilder) { }
  get userRoles(): typeof AuthorizationRoles {
    return AuthorizationRoles;
  }
  ngOnInit() {
    this.formGroup = this.formBuilder.formGroup(new UserInfo());
    this.formGroup.patchValue(this.data);
  }
  onCancelClick(): void {
    this.dialogRef.close();
  }
  getControl(controlName: string): any {
    return this.formGroup.get(controlName);
  }
  editUser() {
    this.dialogRef.close(this.formGroup.value);
  }
}