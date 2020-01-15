import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Parties} from "../models/party.model";
import {AccessService} from "../services/access.service";
import {Tweet} from "../models/tweet.model";

@Component({
  selector: 'app-party-selection',
  templateUrl: './party-selection.component.html',
  styleUrls: ['./party-selection.component.scss']
})

export class PartySelectionComponent implements OnInit {
  @Output() readonly selectedPartiesChange: EventEmitter<Parties[]> = new EventEmitter();

  parties: Tweet[];
  selectedParties: Parties[];

  partiesEnum = Parties;

  constructor(public access: AccessService) {
    this.selectedParties = [];
  }

  async ngOnInit() {
    this.parties = await this.access.getParties();
    console.log('parties resolved: ', this.parties);
    for (let party of Object.values(this.partiesEnum)){
        this.selectParty(party);
    }
  }

  selectParty(party: Parties) {
    if (this.selectedParties.includes(party)) {
      this.selectedParties.filter(p => p !== party);
    } else {
      this.selectedParties.push(party);
    }
    this.selectedPartiesChange.emit(this.selectedParties);
  }

}
