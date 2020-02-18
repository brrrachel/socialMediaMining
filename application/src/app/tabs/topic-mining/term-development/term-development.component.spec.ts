import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TermDevelopmentComponent } from './term-development.component';

describe('TermDevelopmentComponent', () => {
  let component: TermDevelopmentComponent;
  let fixture: ComponentFixture<TermDevelopmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TermDevelopmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TermDevelopmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
