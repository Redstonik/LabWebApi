import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { FormGroup } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductInfo } from 'src/app/core/models/products/ProductInfo';
import { InputValidationService } from
  'src/app/core/services/InputValidation.service';
import { AuthorizationRoles } from 'src/app/configs/auth-roles';
import { CommentService } from 'src/app/core/services/Comment.service';
@Component({
  selector: 'app-detail-product-dialog',
  templateUrl: './detail-product-dialog.component.html',
  styleUrls: ['./detail-product-dialog.component.css']
})
export class DetailProductDialogComponent implements OnInit {
  formGroup: FormGroup;
  productId: number;

  constructor(private dialogRef: MatDialogRef<DetailProductDialogComponent>,
    public validationService: InputValidationService,
    @Inject(MAT_DIALOG_DATA) public data: ProductInfo,
    private formBuilder: RxFormBuilder,
    private commentService: CommentService) { }
  get userRoles(): typeof AuthorizationRoles {
    return AuthorizationRoles;
  }
  ngOnInit() {
    this.formGroup = this.formBuilder.formGroup(new ProductInfo());
    this.formGroup.patchValue(this.data);
    this.productId = this.data.id
    
  }
  onCancelClick(): void {
    this.dialogRef.close();
  }
  getControl(controlName: string): any {
    return this.formGroup.get(controlName);
  }
}