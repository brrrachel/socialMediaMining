import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {PartyState} from "../models/party.model";

@Component({
  selector: 'app-party-selection',
  templateUrl: './party-selection.component.html',
  styleUrls: ['./party-selection.component.scss']
})

export class PartySelectionComponent implements OnInit {
  @Output() readonly selectedPartiesChange: EventEmitter<PartyState> = new EventEmitter();

  selectedParties: PartyState = new PartyState();

  constructor() {
  }

  ngOnInit() {

  }

  selectParty(party: string) {
    this.selectedParties[party] = !this.selectedParties[party];
    this.selectedPartiesChange.emit(this.selectedParties);
  }

}
