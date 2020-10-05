import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/shared/services/products.service';
import { NgbModalOptions, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddProductComponent } from '../add-product/add-product.component';
@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {
  products = [];
  constructor(private productService: ProductsService, private modalService: NgbModal) { }

  ngOnInit() {
    this.getProducts();
  }
  getProducts() {
    this.productService.getProducts().subscribe((data: any) => {
      this.products = data;
    });
  }
  addProduct(object, type) {
    const productObj = type === 'order' ? object : undefined;
    const headerType = type === 'order' ? 'Order Product' : 'Add Product';
    const buttonType = type === 'order' ? 'Order' : 'Save';
    const ngbModalOptions: NgbModalOptions = {
      backdrop: 'static',
      keyboard: false,
      size: 'lg'
    };
    const modalRef = this.modalService.open(AddProductComponent, ngbModalOptions);
    modalRef.componentInstance.selectedProduct = productObj;
    modalRef.componentInstance.headertype = headerType;
    modalRef.componentInstance.buttonType = buttonType;
    modalRef.componentInstance.isModal = true;
    modalRef.result.then(
      (data: any) => {
        this.getProducts();
      },
      (reason: any) => { }
    );
  }
}
