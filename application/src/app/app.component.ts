import { Component } from '@angular/core';
import {PartyState} from "./models/party.model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'application';
  selectedParties: PartyState;
  value: number = 0;
  selectedYears: [number, number] = [2008, 2019];
}
