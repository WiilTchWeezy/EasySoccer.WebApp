import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationPaymentsComponent } from './reservation-payments.component';

describe('ReservationPaymentsComponent', () => {
  let component: ReservationPaymentsComponent;
  let fixture: ComponentFixture<ReservationPaymentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReservationPaymentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservationPaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
