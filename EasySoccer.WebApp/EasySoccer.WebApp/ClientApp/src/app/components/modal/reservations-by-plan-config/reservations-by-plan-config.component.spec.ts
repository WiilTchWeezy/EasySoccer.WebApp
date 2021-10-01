import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationsByPlanConfigComponent } from './reservations-by-plan-config.component';

describe('ReservationsByPlanConfigComponent', () => {
  let component: ReservationsByPlanConfigComponent;
  let fixture: ComponentFixture<ReservationsByPlanConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReservationsByPlanConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservationsByPlanConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
