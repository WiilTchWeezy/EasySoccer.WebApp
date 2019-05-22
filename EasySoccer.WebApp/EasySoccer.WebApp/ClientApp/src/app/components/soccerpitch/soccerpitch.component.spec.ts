import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SoccerpitchComponent } from './soccerpitch.component';

describe('SoccerpitchComponent', () => {
  let component: SoccerpitchComponent;
  let fixture: ComponentFixture<SoccerpitchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SoccerpitchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SoccerpitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
