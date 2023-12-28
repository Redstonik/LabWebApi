import { Component, OnInit } from '@angular/core';
import { AuthorizationRoles } from 'src/app/configs/auth-roles';
import { UserInfo } from 'src/app/core/models/admin/UserInfo';
import { ProductInfo } from 'src/app/core/models/products/ProductInfo';
import { CreatedProductInfo } from 'src/app/core/models/products/CreatedProductInfo';
import { ProductService } from 'src/app/core/services/Product.service';
import { AlertService } from 'src/app/core/services/Alert.service';
import { MatDialog } from '@angular/material/dialog';
import { AddProductDialogComponent } from 'src/app/pages/home-components/admin-panel/add-product-dialog/add-product-dialog.component';
import { EditProductDialogComponent } from 'src/app/pages/home-components/admin-panel/edit-product-dialog/edit-product-dialog.component';
import { DetailProductDialogComponent } from 'src/app/pages/home-components/admin-panel/detail-product-dialog/detail-product-dialog.component';
import { AuthenticationService } from 'src/app/core/services/Authentication.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductsListComponent implements OnInit {
  products: ProductInfo[];
  filteredProducts: ProductInfo[] = [];
  currentUser: UserInfo;
  searchControl = new FormControl('');

  constructor(private productService: ProductService, private alertService: AlertService, private dialog: MatDialog, private authService: AuthenticationService) { 
    this.searchControl = new FormControl('');
    this.authService.isAuthenticatedWithRefreshToken().then(isAuthenticated => {
      if (isAuthenticated) {
        this.currentUser = this.authService.currentUser as UserInfo;
      }
    });
    this.searchControl.valueChanges.subscribe((value) => {
      if (value) {
        const term = value.toLowerCase();
        this.filteredProducts = this.products.filter((product) =>
          product.name.toLowerCase().includes(term)
        );
      } else {
        this.filteredProducts = [...this.products];
      }
    });
  }

  async ngOnInit() {
    
    this.productService.getProducts().subscribe((data: ProductInfo[]) => {
      if (this.currentUser.role.toString() == "Seller") {
        this.products = data.filter(product => product.userWhoCreated.id == this.currentUser.id);
      } else {
        this.products = data;
      }
    });
  }

  isAdminOrOwnerRole(user: UserInfo, product: ProductInfo): boolean {
    return user.role.toString() == "Admin" || product.userWhoCreated.id == this.currentUser.id
  }

  isSellerRole(user: UserInfo){
    return user.role.toString() == "Seller"
  }
  async addProduct(){
    const dialogRef = this.dialog.open(AddProductDialogComponent);
    dialogRef.afterClosed().subscribe((result: CreatedProductInfo) => {
      if (result) {
        this.productService.addProduct(result).subscribe((data: ProductInfo) => {
          console.log(data)
          if (data) {
            this.products.push(data);
            this.products = [...this.products];
          } else {
            this.alertService.errorAlert("Add Product", "Failed!");
          }
        });
      }
    });
  }

  async editProduct(product: ProductInfo) {
    const dialogRef = this.dialog.open(EditProductDialogComponent, {
      data: { ...product }
    });
    dialogRef.afterClosed().subscribe((result: ProductInfo) => {;
      if (result) {
        console.log(result);
        console.log(this.products);
        this.productService.editProduct(result).subscribe((data: any) => {
          let modelIndex = this.products.findIndex((x: any) => x.id == data.id);
          if (modelIndex !== -1) {
            this.products.splice(modelIndex, 1, data);
            this.products = [...this.products];
          } else {
            this.alertService.errorAlert("Update Product", "Failed!");
          }
        });
      }
    });
  }

  async deleteProduct(productId: any) {
    const confirmed = await this.alertService.okCancalAlert(`Do you really want 
    to delete this product?`);
    if (confirmed) {
      this.productService.deleteProduct(productId).subscribe(() => {
        const newList = this.products.filter(item => item.id == productId);
        this.products = newList;
      });
    }
  }

  async viewProduct(product: ProductInfo): Promise<void> {
    const dialogRef = this.dialog.open(DetailProductDialogComponent, {
      data: { ...product }
    });
  
    // You can perform additional logic after the dialog is closed if needed
    dialogRef.afterClosed().subscribe((result: any) => {
      // Add any logic here if necessary
    });
  }
}
