import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstlandingComponent } from './firstlanding.component';

describe('FirstlandingComponent', () => {
  let component: FirstlandingComponent;
  let fixture: ComponentFixture<FirstlandingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FirstlandingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FirstlandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
