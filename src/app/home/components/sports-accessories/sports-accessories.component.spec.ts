import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SportsAccessoriesComponent } from './sports-accessories.component';

describe('SportsAccessoriesComponent', () => {
  let component: SportsAccessoriesComponent;
  let fixture: ComponentFixture<SportsAccessoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SportsAccessoriesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SportsAccessoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
