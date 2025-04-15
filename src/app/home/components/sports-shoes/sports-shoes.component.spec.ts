import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SportsShoesComponent } from './sports-shoes.component';

describe('SportsShoesComponent', () => {
  let component: SportsShoesComponent;
  let fixture: ComponentFixture<SportsShoesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SportsShoesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SportsShoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
