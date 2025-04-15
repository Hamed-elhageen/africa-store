import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpyouComponent } from './helpyou.component';

describe('HelpyouComponent', () => {
  let component: HelpyouComponent;
  let fixture: ComponentFixture<HelpyouComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HelpyouComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HelpyouComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
