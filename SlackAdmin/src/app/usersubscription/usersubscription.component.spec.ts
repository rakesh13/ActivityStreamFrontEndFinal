import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersubscriptionComponent } from './usersubscription.component';

describe('UsersubscriptionComponent', () => {
  let component: UsersubscriptionComponent;
  let fixture: ComponentFixture<UsersubscriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersubscriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersubscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
