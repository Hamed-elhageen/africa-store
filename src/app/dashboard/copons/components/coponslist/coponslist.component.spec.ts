import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoponslistComponent } from './coponslist.component';

describe('CoponslistComponent', () => {
  let component: CoponslistComponent;
  let fixture: ComponentFixture<CoponslistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CoponslistComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoponslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
