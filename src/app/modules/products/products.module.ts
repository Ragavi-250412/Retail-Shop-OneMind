import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ProductsRoutingModule } from './products-routing.module';
import { AddProductComponent } from './add-product/add-product.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { ProductsService } from 'src/app/shared/services/products.service';


@NgModule({
  declarations: [AddProductComponent, ProductsListComponent],
  imports: [
    CommonModule,
    RouterModule,
    ProductsRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [ProductsService],
  exports: [RouterModule]
})
export class ProductsModule { }
