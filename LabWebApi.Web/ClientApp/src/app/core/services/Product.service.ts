import { AlertService } from './Alert.service';
import { catchError, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { productsUrl } from 'src/app/configs/productController-endpoints';
import { ProductInfo } from '../models/products/ProductInfo';
import { CreatedProductInfo } from '../models/products/CreatedProductInfo';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

constructor(private http: HttpClient, private alertService: AlertService) {}

getProducts(): Observable<ProductInfo[]>{
  return this.http.get<ProductInfo[]>(productsUrl + "/all").pipe(
    catchError(err => {
      this.alertService.errorAlert(err.error, "Get Products Failed!");
      return of();
  }));
}

addProduct(product: CreatedProductInfo): Observable<ProductInfo>{
  product.publicationDate = new Date().toISOString();
  console.log(product)
  return this.http.post<ProductInfo>(productsUrl + `/create`, product).pipe(
    catchError(err => {
      this.alertService.errorAlert(err, "Add Product Failed!");
      return of();
  }));
}

deleteProduct(productId: any): Observable<any>{
  return this.http.delete<any>(productsUrl + `/delete/${productId}`).pipe(
    catchError(err => {
      this.alertService.errorAlert(err.error, "Delete product Failed!");
      return of();
  }));
}

editProduct(product: ProductInfo): Observable<ProductInfo>{
  return this.http.put<ProductInfo>(productsUrl+ `/update/${product.id}`, product).pipe(
    catchError(err => {
      this.alertService.errorAlert(err, "Edit Product Failed!");
      return of();
  }));
}

}

