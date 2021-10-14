import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormOfPaymentComponent } from './form-of-payment.component';

describe('FormOfPaymentComponent', () => {
  let component: FormOfPaymentComponent;
  let fixture: ComponentFixture<FormOfPaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormOfPaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormOfPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
