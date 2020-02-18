import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FiveFactorComponent } from './five-factor.component';

describe('TermFrequencyComponent', () => {
  let component: FiveFactorComponent;
  let fixture: ComponentFixture<FiveFactorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FiveFactorComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiveFactorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
