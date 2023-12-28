import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { FormGroup } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductInfo } from 'src/app/core/models/products/ProductInfo';
import { InputValidationService } from
  'src/app/core/services/InputValidation.service';
import { AuthorizationRoles } from 'src/app/configs/auth-roles';
@Component({
  selector: 'app-edit-product-dialog',
  templateUrl: './edit-product-dialog.component.html',
  styleUrls: ['./edit-product-dialog.component.css']
})
export class EditProductDialogComponent implements OnInit {
  formGroup: FormGroup;

  constructor(private dialogRef: MatDialogRef<EditProductDialogComponent>,
    public validationService: InputValidationService,
    @Inject(MAT_DIALOG_DATA) public data: ProductInfo,
    private formBuilder: RxFormBuilder) { }
  get userRoles(): typeof AuthorizationRoles {
    return AuthorizationRoles;
  }
  ngOnInit() {
    this.formGroup = this.formBuilder.formGroup(new ProductInfo());
    this.formGroup.patchValue(this.data);
  }
  onCancelClick(): void {
    this.dialogRef.close();
  }
  getControl(controlName: string): any {
    return this.formGroup.get(controlName);
  }
  editProduct() {
    this.dialogRef.close(this.formGroup.value);
  }
}