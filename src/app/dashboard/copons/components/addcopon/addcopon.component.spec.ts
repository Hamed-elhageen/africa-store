import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddcoponComponent } from './addcopon.component';

describe('AddcoponComponent', () => {
  let component: AddcoponComponent;
  let fixture: ComponentFixture<AddcoponComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddcoponComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddcoponComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
