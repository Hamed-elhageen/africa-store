import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaindetailsComponent } from './maindetails.component';

describe('MaindetailsComponent', () => {
  let component: MaindetailsComponent;
  let fixture: ComponentFixture<MaindetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MaindetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaindetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
