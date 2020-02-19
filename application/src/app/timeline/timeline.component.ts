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
      {date: new Date(2009, 8, 27), name: 'Parliamentary elections for the Bundestag'},
      {date: new Date(2010, 0, 20), name: 'Earthquake Haiti'},
      {date: new Date(2010, 2, 23), name: 'Passage of Obamacare'},
      {date: new Date(2010, 4, 31), name: 'Horst Köhler resigns'},
      {date: new Date(2010, 5, 30), name: 'Christian Wulf becomes Federal President'},
      {date: new Date(2010, 8, 15), name: 'Stuttgart21 protests escalate'},
      {date: new Date(2010, 11, 15), name: 'Arab Spring Riots start'},
      {date: new Date(2011, 1, 15), name: 'Protests in Egypt and Libya'},
      {date: new Date(2011, 2, 1), name: 'Abolition of compulsory military service'},
      {date: new Date(2011, 2, 11), name: 'Nuclear disaster in Fukushima'},
      {date: new Date(2011, 4, 2), name: 'Assassination of Osama bin Laden'},
      {date: new Date(2011, 6, 21), name: 'Climax Euro crisis'},
      {date: new Date(2011, 10, 15), name: 'Planned opening of BER'},
      {date: new Date(2012, 0, 13), name: 'Costa Concordia Accident'},
      {date: new Date(2012, 1, 17), name: 'Christian Wulff resigns'},
      {date: new Date(2012, 1, 17), name: 'Gauck becomes Federal President'},
      {date: new Date(2012, 9, 27), name: 'Hurricane Sandy'},
      {date: new Date(2013, 1, 6), name: 'Establishment of AfD'},
      {date: new Date(2013, 3, 15), name: 'ISIS Uprising'},
      {date: new Date(2013, 5, 15), name: 'NSA Affair'},
      {date: new Date(2013, 8, 22), name: 'Parliamentary elections for the Bundestag'},
      {date: new Date(2014, 1, 27), name: 'Begin of the Krim Crisis'},
      {date: new Date(2014, 6, 13), name: 'Germany wins Footbal WCS'},
      {date: new Date(2014, 8, 1), name: 'Ebola Outbreak'},
      {date: new Date(2014, 9, 15), name: 'Begin Pegida demonstrations'},
      {date: new Date(2015, 0, 7), name: 'Terrorist attack on Charlie Hebdo'},
      {date: new Date(2015, 8, 15), name: 'Climax of refugee crisis'},
      {date: new Date(2015, 10, 13), name: 'Terrorist attack in Paris'},
      {date: new Date(2015, 11, 12), name: 'UN-climate conference'},
      {date: new Date(2016, 3, 3), name: 'Panama Papers'},
      {date: new Date(2016, 5, 23), name: 'Brexit decision'},
      {date: new Date(2016, 6, 15), name: 'Attempted Coup in Turkey'},
      {date: new Date(2016, 10, 8), name: 'Trump becomes USA President'},
      {date: new Date(2016, 11, 19), name: 'Terrorist attack on Berlin Christmas Fair'},
      {date: new Date(2017, 3, 19), name: 'Macron becomes French President'},
      {date: new Date(2017, 5, 30), name: 'Marriage for all in Germany'},
      {date: new Date(2017, 8, 24), name: 'Parliamentary elections for the Bundestag'},
      {date: new Date(2018, 2, 4), name: 'Vote for grand coalition'},
      {date: new Date(2018, 5, 12), name: 'Agreement on North Koreas\'s denuclearization'},
      {date: new Date(2019, 4, 15), name: 'Ibiza Affair'},
      {date: new Date(2019, 6, 15), name: 'Mass protests in Hong Kong'},
      {date: new Date(2019, 8, 30), name: 'Biggest Fridays for Future demonstration'},
      {date: new Date(2019, 8, 30), name: 'Biggest Fridays for Future demonstration'},
      {date: new Date(2019, 11, 13), name: 'Boris Johnson becomes Prime Minister'}
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
