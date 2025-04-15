import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SportsTshirtsComponent } from './sports-tshirts.component';

describe('SportsTshirtsComponent', () => {
  let component: SportsTshirtsComponent;
  let fixture: ComponentFixture<SportsTshirtsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SportsTshirtsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SportsTshirtsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
