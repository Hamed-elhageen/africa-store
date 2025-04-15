import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SportsBagsComponent } from './sports-bags.component';

describe('SportsBagsComponent', () => {
  let component: SportsBagsComponent;
  let fixture: ComponentFixture<SportsBagsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SportsBagsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SportsBagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
