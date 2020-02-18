import { Component } from '@angular/core';
import {Parties} from "./models/party.model";
import {MAX_TIMESPAN, Timespan} from "./models/time-span.model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'application';
  selectedParties: Parties[] = [];
  value: number = 0;
  selectedYears: Timespan = MAX_TIMESPAN;
}
