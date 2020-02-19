import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventHintComponent } from './event-hint.component';

describe('EventHintsComponent', () => {
  let component: EventHintComponent;
  let fixture: ComponentFixture<EventHintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventHintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventHintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
