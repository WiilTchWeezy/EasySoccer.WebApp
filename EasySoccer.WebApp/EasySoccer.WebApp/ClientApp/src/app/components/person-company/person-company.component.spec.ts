import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonCompanyComponent } from './person-company.component';

describe('PersonCompanyComponent', () => {
  let component: PersonCompanyComponent;
  let fixture: ComponentFixture<PersonCompanyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonCompanyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
