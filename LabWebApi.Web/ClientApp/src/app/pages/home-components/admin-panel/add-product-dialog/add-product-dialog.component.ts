import { Component,Inject, OnInit } from '@angular/core';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CreatedProductInfo } from 'src/app/core/models/products/CreatedProductInfo';
import { InputValidationService } from
  'src/app/core/services/InputValidation.service';
import { AuthorizationRoles } from 'src/app/configs/auth-roles';

@Component({
  selector: 'app-add-product-dialog',
  templateUrl: './add-product-dialog.component.html',
  styleUrls: ['./add-product-dialog.component.css']
})
export class AddProductDialogComponent implements OnInit {

  formGroup: FormGroup;

  constructor(private dialogRef: MatDialogRef<AddProductDialogComponent>,
    public validationService: InputValidationService,
    @Inject(MAT_DIALOG_DATA) public data: CreatedProductInfo,
    private formBuilder: RxFormBuilder) { }

  get userRoles(): typeof AuthorizationRoles {
    return AuthorizationRoles;
  }
  ngOnInit() {
    this.formGroup = this.formBuilder.formGroup(new CreatedProductInfo());
    this.formGroup.patchValue(this.data);
    console.log(this.data)
  }
  onCancelClick(): void {
    this.dialogRef.close();
  }
  getControl(controlName: string): any {
    return this.formGroup.get(controlName);
  }
  addProduct() {
    this.dialogRef.close(this.formGroup.value);
  }
}
