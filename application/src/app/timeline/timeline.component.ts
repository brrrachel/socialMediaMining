import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ALL_DATE_POINTS, Timespan} from "../models/time-span.model";
import {HintObject} from "./event-hint/event-hint.component";

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit {
  @Output() yearRangeChange: EventEmitter<Timespan> = new EventEmitter<Timespan>();

  dateLabels: string[] = [
    '2008', '', '', '',
    '2009', '', '', '',
    '2010', '', '', '',
    '2011', '', '', '',
    '2012', '', '', '',
    '2013', '', '', '',
    '2014', '', '', '',
    '2015', '', '', '',
    '2016', '', '', '',
    '2017', '', '', '',
    '2018', '', '', '',
    '2019', '', '', '',
    '2020'
  ];
  myTicks: number[] = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,
    30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48];
  events: HintObject[] = [
      {date: new Date(2009, 8, 27), name: 'Bundestagswahl'},
      {date: new Date(2010, 0, 20), name: 'Erdbeben Haiti'},
      {date: new Date(2010, 2, 23), name: 'Verabschiedung Obamacare'},
      {date: new Date(2010, 4, 31), name: 'Horst Köhler tritt zurück'},
      {date: new Date(2010, 5, 30), name: 'Christian Wulf wird Bundespräsident'},
      {date: new Date(2010, 8, 15), name: 'Stuttgart21 Proteste exkalieren'},
      {date: new Date(2010, 11, 15), name: 'Aufstände Arabischer Frühling'},
    ];

  constructor() { }

  ngOnInit() {
  }

  onChange(values: TimelineValues) {
    const selectedTimespan: Timespan = {
      startTime: ALL_DATE_POINTS[values.newValue[0]],
      endTime: ALL_DATE_POINTS[values.newValue[1]]
    };
    this.yearRangeChange.emit(selectedTimespan);
  }
}

export interface TimelineValues {
  oldValue: [number, number];
  newValue: [number, number];
}
