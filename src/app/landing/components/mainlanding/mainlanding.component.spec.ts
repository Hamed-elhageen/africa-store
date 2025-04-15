import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainlandingComponent } from './mainlanding.component';

describe('MainlandingComponent', () => {
  let component: MainlandingComponent;
  let fixture: ComponentFixture<MainlandingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MainlandingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainlandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
