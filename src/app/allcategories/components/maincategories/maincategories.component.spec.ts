import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaincategoriesComponent } from './maincategories.component';

describe('MaincategoriesComponent', () => {
  let component: MaincategoriesComponent;
  let fixture: ComponentFixture<MaincategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MaincategoriesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaincategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
