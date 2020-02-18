import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {getColorForParty, Parties} from "../../../models/party.model";
import {AccessService, TopicFrequencyModel} from "../../../services/access.service";
import * as Chart from 'chart.js'
import {ChartData} from '../../basics/basics.component'
import {DatePipe} from "@angular/common";
import {MAX_TIMESPAN, Timespan} from "../../../models/time-span.model";
import {createLabels} from "../../../shared/helper-functions";

@Component({
  selector: 'app-term-development',
  templateUrl: './term-development.component.html',
  styleUrls: ['./term-development.component.css']
})
export class TermDevelopmentComponent implements OnInit, OnChanges {

  @Input() selectedParties: Parties[] = [];
  @Input() selectedYears: Timespan = MAX_TIMESPAN;

  currentSearchTerm: string = '';

  chart: Chart;
  ctx: CanvasRenderingContext2D;

  chartOptions: Chart.ChartOptions = {
    responsive: true,
    scales: {
      xAxes: [{
        type: 'time',
        time: {
          unit: 'month'
        }
      }]
    }
  };

  constructor(private accessService: AccessService, public datepipe: DatePipe) {
  }

  ngOnInit() {
    this.initChart();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedParties'] || changes['selectedYears']) {
      this.getData();
    }
  }

  getData() {
    console.log('Parties', this.selectedParties);
    this.accessService.getFrequencyForTopic(this.currentSearchTerm, this.selectedParties, this.selectedYears)
      .then(data => this.prepareData(data));
  }

  private prepareData(data: { party: string, frequency: TopicFrequencyModel[] }[]) {
    const labels = createLabels(this.selectedYears);
    let preparedDataSet: ChartData[] = new Array<ChartData>();
    const party_keys = Object.keys(Parties);
    let allAccountNames: string[] = this.generateAccountNames(party_keys.map(k => Parties[k as any]));

    for (let party of allAccountNames) {
      let partyFrequencyModelList: TopicFrequencyModel[];

      if (party === 'CDU/CSU') {
        let dataCDU = data.filter(data => data.party == 'CDU')[0];
        let dataCSU = data.filter(data => data.party == 'CSU')[0];
        partyFrequencyModelList = dataCDU ? dataCDU.frequency : [];
        const csuFrequency = dataCSU ? dataCSU.frequency : [];
        partyFrequencyModelList.concat(csuFrequency);
      } else {
        const partyData = data.filter(data => data.party == party);
        partyFrequencyModelList = partyData.length ? partyData[0].frequency : [];
      }

      if (partyFrequencyModelList.length) {
        let dataSetForAccount = this.createDataSetForAccount(labels, partyFrequencyModelList);
        dataSetForAccount.label = party;
        dataSetForAccount.borderColor = getColorForParty(party === 'CDU/CSU' ? Parties.csu : party);
        preparedDataSet.push(dataSetForAccount);
      }
    }

    this.chart.data.labels = labels;
    this.chart.data.datasets = preparedDataSet;
    this.chart.update();

  }

  generateAccountNames(parties: string[]): string[] {
    let labels = parties.map(value => value.toString());
    let indexCDU = labels.indexOf(Parties.cdu);
    let indexCSU = labels.indexOf(Parties.csu);
    if (indexCDU > -1 && indexCSU > -1) {
      if (indexCSU > indexCDU) {
        labels.splice(indexCSU, 1);
        labels.splice(indexCDU, 1);
      } else {
        labels.splice(indexCDU, 1);
        labels.splice(indexCSU, 1);
      }
      labels.push('CDU/CSU');
    }
    return labels;
  }

  createDataSetForAccount(labels: string[], dataSet: TopicFrequencyModel[]) {
    let values: number[] = [];

    for (let month of labels) {
      let countsOfMonth: number = dataSet.filter(data => {
        let date = this.datepipe.transform(new Date(data.year, data.month), 'yyyy-MM-dd');
        return date === month
      }).map(data => data.frequency)
        .reduce((prev, curr) => prev + curr, 0);
      values.push(countsOfMonth);
    }
    return {data: values, fill: false} as ChartData
  }

  handleInputTerm(term: string) {
    this.currentSearchTerm = term;
    this.getData();
  }

  initChart() {
    let canvas = <HTMLCanvasElement>document.getElementById('termDevelopment');
    this.ctx = canvas.getContext('2d');
    this.chart = new Chart(this.ctx, {
      type: 'line',
      data: {},
      options: this.chartOptions
    });
    this.chart.update();
  };

}
