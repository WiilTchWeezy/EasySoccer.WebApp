import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SoccerpitchplanComponent } from './soccerpitchplan.component';

describe('SoccerpitchplanComponent', () => {
  let component: SoccerpitchplanComponent;
  let fixture: ComponentFixture<SoccerpitchplanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SoccerpitchplanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SoccerpitchplanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
