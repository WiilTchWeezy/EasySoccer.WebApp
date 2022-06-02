import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationPaymentsModalComponent } from './reservation-payments-modal.component';

describe('ReservationPaymentsModalComponent', () => {
  let component: ReservationPaymentsModalComponent;
  let fixture: ComponentFixture<ReservationPaymentsModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReservationPaymentsModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservationPaymentsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
