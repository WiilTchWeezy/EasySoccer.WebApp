import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanGenerationConfigModalComponent } from './plan-generation-config-modal.component';

describe('PlanGenerationConfigModalComponent', () => {
  let component: PlanGenerationConfigModalComponent;
  let fixture: ComponentFixture<PlanGenerationConfigModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanGenerationConfigModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanGenerationConfigModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
