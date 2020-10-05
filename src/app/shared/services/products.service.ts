import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UrlConfig } from './url.config';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }
  getProducts() {
    return this.http.get(environment.retailAPI + UrlConfig.totalUrl.getProducts);
  }
  addProducts(productObj) {
    return this.http.post(environment.retailAPI + UrlConfig.totalUrl.addProducts, productObj);
  }
  orderProducts(orderObj) {
    return this.http.post(environment.retailAPI + UrlConfig.totalUrl.orderProducts, orderObj);
  }
}
