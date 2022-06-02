import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationListModalComponent } from './reservation-list-modal.component';

describe('ReservationListModalComponent', () => {
  let component: ReservationListModalComponent;
  let fixture: ComponentFixture<ReservationListModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReservationListModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservationListModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
