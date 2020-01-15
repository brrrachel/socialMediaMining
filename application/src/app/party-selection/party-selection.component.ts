import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {PartyState} from "../models/party.model";
import {AccessService} from "../services/access.service";
import {Tweet} from "../models/tweet.model";

@Component({
  selector: 'app-party-selection',
  templateUrl: './party-selection.component.html',
  styleUrls: ['./party-selection.component.scss']
})

export class PartySelectionComponent implements OnInit {
  @Output() readonly selectedPartiesChange: EventEmitter<PartyState> = new EventEmitter();

  selectedParties: PartyState = new PartyState();
  parties: Tweet[];

  constructor(public access: AccessService) {
  }

  async ngOnInit() {
    this.parties = await this.access.getParties();
    console.log('parties resolved: ', this.parties);
  }

  selectParty(party: string) {
    this.selectedParties[party] = !this.selectedParties[party];
    this.selectedPartiesChange.emit(this.selectedParties);
  }

}
