import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'event-hint',
  templateUrl: './event-hint.component.html',
  styleUrls: ['./event-hint.component.scss']
})
export class EventHintComponent implements OnInit {

  @Input() hintObject: HintObject;

  constructor() {
  }

  ngOnInit() {
  }

  get objectPosition(): string {
    if (this.hintObject.date) {
      const year = this.hintObject.date.getFullYear();
      const day = this.hintObject.date.getDate();
      const dayAddition = day < 10 ? 0 : (day < 20 ? 0.5 : 1);
      const month = this.hintObject.date.getMonth() + dayAddition;
      const resultPosition = (year - 2008) * (100 / 12) + month * (100 / 144);
      return resultPosition + '%';
    } else {
      return '';
    }
  }

}

export interface HintObject {
  date: Date,
  name: string
}
