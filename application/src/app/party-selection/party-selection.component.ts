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

  tenTweets: Tweet[];
  selectedParties: Parties[];

  partiesEnum = Parties;

  constructor(public access: AccessService) {
    this.selectedParties = [];
  }

  async ngOnInit() {
    this.tenTweets = await this.access.getTenTweets();
    console.log('parties resolved: ', this.tenTweets);
    for (let party of Object.values(this.partiesEnum)){
        this.selectParty(party);
    }
  }

  selectParty(party: Parties) {
    if (this.selectedParties.includes(party)) {
      this.selectedParties = this.selectedParties.filter(p => p !== party);
    } else {
      this.selectedParties.push(party);
    }
    this.selectedPartiesChange.emit(this.selectedParties);
  }

}
