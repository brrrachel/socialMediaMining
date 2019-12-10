import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit {
  @Output() yearRangeChange: EventEmitter<[number, number]> = new EventEmitter<[number, number]>();

  constructor() { }

  ngOnInit() {
  }

  onChange(values: TimelineValues) {
    this.yearRangeChange.emit(values.newValue)
  }
}

export interface TimelineValues {
  oldValue: [number, number];
  newValue: [number, number];
}
