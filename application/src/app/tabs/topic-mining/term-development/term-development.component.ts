import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {getColorForParty, Parties} from "../../../models/party.model";
import {AccessService, TopicFrequencyModel} from "../../../services/access.service";
import * as Chart from 'chart.js'
import {ChartData} from '../../basics/basics.component'
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-term-development',
  templateUrl: './term-development.component.html',
  styleUrls: ['./term-development.component.css']
})
export class TermDevelopmentComponent implements OnInit, OnChanges {

  @Input() selectedParties: Parties[];
  @Input() selectedYears: [number, number];

  currentParties: Parties[] = [];
  currentYears: [number, number] = [2009, 2019];
  currentSearchTerm: string = 'hello';

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
    let hasChanged = false;
    if (changes['selectedParties']) {
      this.currentParties = changes['selectedParties']['currentValue'];
      hasChanged = true;
    }
    if (changes['selectedYears']) {
      this.currentYears = changes['selectedYears']['currentValue'];
      hasChanged = true;
    }
    if (hasChanged) {
      this.getData();
    }
  }

  getData() {
    console.log('Parties', this.currentParties);
    this.accessService.getFrequencyForTopic(this.currentSearchTerm, this.currentParties, this.currentYears[0], this.currentYears[1])
      .then(data => this.prepareData(data));
  }

  private prepareData(data: { party: string, frequency: TopicFrequencyModel[] }[]) {
    const labels = this.createLabels(this.currentYears[0], 1, this.currentYears[1], 11);
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

  createLabels(startYear: number, startMonth: number, endYear: number, endMonth: number) {
    let range = function (start, end): number[] {
      var list = [];
      for (var i = start; i <= end; i++) {
        list.push(i);
      }
      return list;
    };

    let labels: string[] = [];
    let months: number[] = range(1, 12);
    let years: number[] = range(startYear, endYear);
    for (let year of years) {
      for (let month of months) {
        if (year < 2019 || (year === 2019 && month <= endMonth)) {
          labels.push(this.datepipe.transform(new Date(year, month - 1), 'yyyy-MM-dd'));
        }
      }
    }
    return labels;
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
