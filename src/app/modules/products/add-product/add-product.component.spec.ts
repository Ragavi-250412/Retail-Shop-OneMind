import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import {ProductsService} from 'src/app/shared/services/products.service';
import { AddProductComponent } from './add-product.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {HttpClientModule} from '@angular/common/http';
import {ToastrModule, ToastrService} from 'ngx-toastr';
import { NgbActiveModal, NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('AddProductComponent', () => {
  let component: AddProductComponent;
  let fixture: ComponentFixture<AddProductComponent>;
  let service: ProductsService;
  let h5: HTMLElement;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddProductComponent ],
      imports: [ReactiveFormsModule, NgbModule, FormsModule, HttpClientTestingModule, ToastrModule.forRoot()],
      providers: [NgbActiveModal, ProductsService, ToastrService,
        NgbModal]
    })
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProductComponent);
    component = fixture.componentInstance;
    h5 = fixture.nativeElement;
  });


  it('should be created', () => {
    service = TestBed.get(ProductsService);
    expect(service).toBeTruthy();
   });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should display original title', () => {
   let text = h5.querySelector('h5').textContent;
   expect(text).toBe('');
   text = 'Add Product';
   expect(text).toBe('Add Product');
  });
  it('should be invalid form', () => {
    component.formInit();
    expect(component.addProductForm.valid).toBeFalsy();
  });
  it('should be valid form', () => {
    component.ngOnInit();
    component.addProductForm.patchValue({productName: 'channa dal'});
    component.addProductForm.patchValue({quantity: 4});
    expect(component.addProductForm.valid).toBeTruthy();
  });
  it('should save form', fakeAsync(() => {
    spyOn(component, 'saveItem');
    const saveButton = fixture.debugElement.query(By.css('#saveButton'));
    saveButton.nativeElement.click();
    expect(component.saveItem).toHaveBeenCalled();
  }));
});
