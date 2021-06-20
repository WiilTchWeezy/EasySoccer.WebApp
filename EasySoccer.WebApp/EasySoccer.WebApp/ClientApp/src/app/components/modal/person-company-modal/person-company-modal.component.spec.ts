import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonCompanyModalComponent } from './person-company-modal.component';

describe('PersonCompanyModalComponent', () => {
  let component: PersonCompanyModalComponent;
  let fixture: ComponentFixture<PersonCompanyModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonCompanyModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonCompanyModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
