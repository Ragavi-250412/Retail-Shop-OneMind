import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, RequiredValidator } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductsService } from 'src/app/shared/services/products.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  addProductForm: FormGroup;
  @Input() selectedProduct: any;
  @Input() headertype: any = 'Add Product';
  @Input() buttonType: any;
  submitted = false;
  constructor(private fb: FormBuilder, private activeModal: NgbActiveModal, private productService: ProductsService,
              private toastr: ToastrService) { }

  ngOnInit() {
    this.formInit();
    if (this.selectedProduct !== undefined) {
      this.addProductForm.patchValue({productName: this.selectedProduct.productName, quantity: this.selectedProduct.availableQuantity});
    }
  }
  get f() { return this.addProductForm.controls; }

  formInit() {
    this.addProductForm = this.fb.group({
      productName: ['', Validators.required],
      quantity: ['', Validators.required]
    });
  }
  closeModal() {
    this.activeModal.close();
  }
  saveItem() {
    this.submitted = true;
    if (this.addProductForm.invalid) {
      this.toastr.error('Please enter the valid fields', 'Error!!!');
      return;
    }
    const addProductObj = {
      productName: this.addProductForm.value.productName,
      availableQuantity: +this.addProductForm.value.quantity
    };
    const orderObj = {
      orderId: this.selectedProduct ? this.selectedProduct.productId : '',
      customerId: this.selectedProduct ? this.selectedProduct.productId : '',
      productId: this.selectedProduct ? this.selectedProduct.productId : '',
      quantity: +this.addProductForm.value.quantity
    };
    if (this.selectedProduct === undefined) {
    this.productService.addProducts(addProductObj).subscribe(data => {
      if (data === true) {
        this.toastr.success('Product Added Successfully.', 'Success!!!');
        this.submitted = false;
        this.activeModal.close();
      }
    });
  } else {
    if (this.selectedProduct.availableQuantity < this.addProductForm.value.quantity) {
      this.toastr.error('Quantity exceeds the availablequantity', 'Error!!!');
      return;
    }
    this.productService.orderProducts(orderObj).subscribe(data => {
      if (data === true) {
        this.toastr.success('Product Ordered Successfully.', 'Success!!!');
        this.submitted = false;
        this.activeModal.close();
      }
    });
  }
  }
}
