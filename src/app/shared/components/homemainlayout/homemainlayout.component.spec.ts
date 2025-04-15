import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomemainlayoutComponent } from './homemainlayout.component';

describe('HomemainlayoutComponent', () => {
  let component: HomemainlayoutComponent;
  let fixture: ComponentFixture<HomemainlayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomemainlayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomemainlayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
