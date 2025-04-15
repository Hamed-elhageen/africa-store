import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaincartComponent } from './maincart.component';

describe('MaincartComponent', () => {
  let component: MaincartComponent;
  let fixture: ComponentFixture<MaincartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MaincartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaincartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
