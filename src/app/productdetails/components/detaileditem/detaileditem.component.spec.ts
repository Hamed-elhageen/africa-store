import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetaileditemComponent } from './detaileditem.component';

describe('DetaileditemComponent', () => {
  let component: DetaileditemComponent;
  let fixture: ComponentFixture<DetaileditemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetaileditemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetaileditemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
