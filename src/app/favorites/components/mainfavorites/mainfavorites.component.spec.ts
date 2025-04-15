import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainfavoritesComponent } from './mainfavorites.component';

describe('MainfavoritesComponent', () => {
  let component: MainfavoritesComponent;
  let fixture: ComponentFixture<MainfavoritesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MainfavoritesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainfavoritesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
