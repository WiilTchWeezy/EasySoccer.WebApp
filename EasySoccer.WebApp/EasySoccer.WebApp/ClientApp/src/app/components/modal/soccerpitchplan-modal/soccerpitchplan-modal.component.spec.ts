import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SoccerpitchplanModalComponent } from './soccerpitchplan-modal.component';

describe('SoccerpitchplanModalComponent', () => {
  let component: SoccerpitchplanModalComponent;
  let fixture: ComponentFixture<SoccerpitchplanModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SoccerpitchplanModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SoccerpitchplanModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
