import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToastcomponentComponent } from './toastcomponent.component';

describe('ToastcomponentComponent', () => {
  let component: ToastcomponentComponent;
  let fixture: ComponentFixture<ToastcomponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToastcomponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToastcomponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
