import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyregisterComponent } from './verifyregister.component';

describe('VerifyregisterComponent', () => {
  let component: VerifyregisterComponent;
  let fixture: ComponentFixture<VerifyregisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VerifyregisterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerifyregisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
