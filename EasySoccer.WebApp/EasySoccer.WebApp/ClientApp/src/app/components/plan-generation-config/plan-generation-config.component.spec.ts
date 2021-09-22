import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanGenerationConfigComponent } from './plan-generation-config.component';

describe('PlanGenerationConfigComponent', () => {
  let component: PlanGenerationConfigComponent;
  let fixture: ComponentFixture<PlanGenerationConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanGenerationConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanGenerationConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
