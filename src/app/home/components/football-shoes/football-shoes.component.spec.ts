import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FootballShoesComponent } from './football-shoes.component';

describe('FootballShoesComponent', () => {
  let component: FootballShoesComponent;
  let fixture: ComponentFixture<FootballShoesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FootballShoesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FootballShoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
