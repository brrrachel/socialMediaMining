import { Component } from '@angular/core';
import {Parties} from "./models/party.model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'application';
  selectedParties: Parties[];
  value: number = 0;
  selectedYears: [number, number] = [2008, 2019];
}
