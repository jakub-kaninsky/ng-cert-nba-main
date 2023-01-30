import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DaysFilterComponent } from './days-filter.component';

describe('DaysFilterComponent', () => {
  let component: DaysFilterComponent;
  let fixture: ComponentFixture<DaysFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ DaysFilterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DaysFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
