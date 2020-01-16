import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {DatePipe} from '@angular/common'
import {AccessService} from "../../services/access.service";
import {getColorForParty, Parties} from "../../models/party.model";
import * as Chart from 'chart.js'
import {TweetCount} from "../../models/tweetCount.model";

@Component({
  selector: 'app-basics',
  templateUrl: './basics.component.html',
  styleUrls: ['./basics.component.css']
})
export class BasicsComponent implements OnInit, OnChanges {

  accessService: AccessService;

  @Input() selectedParties: Parties[];
  @Input() selectedYears: [number, number];

  currentParties: Parties[] = [];
  currentYears: [number, number] = [2009, 2019];

  chart: Chart;
  ctx: CanvasRenderingContext2D;

  preparedLabels: string[];
  preparedData: ChartData[];

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

  constructor(public access: AccessService, public datepipe: DatePipe) {
    this.accessService = access;
    this.initChart();
  }

  ngOnInit() {
    this.accessService.getTweetCount().then(value => {
      this.prepareData(value);
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    let hasChanged: Boolean = false;
    if (changes['selectedParties']) {
      this.currentParties = changes['selectedParties']['currentValue'];
      hasChanged = true;
    }
    if (changes['selectedYears']) {
      this.currentYears = changes['selectedYears']['currentValue'];
      hasChanged = true;
    }
    if (hasChanged) {
      this.adaptDataToSelection();
    }
  }

  adaptDataToSelection() {
    if(this.preparedData) {
      let newDataSet: ChartData[] = [];
      let newLabels: string[] = this.createLabels(this.currentYears[0], 1, this.currentYears[1], (this.currentYears[1] === 2019 ? 11 : 12) );
      let accountNames: string[] = this.generateAccountNames(this.currentParties);

      for (let set of this.preparedData) {
        if(accountNames.indexOf(set.label) > -1) {
          let newData = {label: set.label, data: [], borderColor: getColorForParty(set.label === 'CDU/CSU'? Parties.csu : set.label), fill: false} as ChartData;
          for (let label of newLabels) {
            let dateIndex = this.preparedLabels.findIndex(oldLabel => oldLabel === label);
            newData.data.push(set.data[dateIndex]);
          }
          newDataSet.push(newData);
        }
      }
      this.chart.data.labels = newLabels;
      this.chart.data.datasets = newDataSet;
      this.chart.update();
    }
  }

  prepareData(unpreparedData: TweetCount[]) {
    let labels: string[] = this.createLabels(this.currentYears[0], 1, this.currentYears[1], 11);
    let preparedDataSet: ChartData[] = new Array<ChartData>();

    for (let party of this.generateAccountNames(this.currentParties)) {

      let accountsOfParty: TweetCount[];
      if (party === 'CDU/CSU'){
        let dataCDU = unpreparedData.filter(data => data.party == 'CDU');
        let dataCSU = unpreparedData.filter(data => data.party == 'CSU');
        dataCDU.forEach(data => {
          let matchingElement = dataCSU.find(element => element.year == data.year && element.month == data.month);
          data.party = 'CDU/CSU';
          data.total += matchingElement.total;
        });
        accountsOfParty = dataCDU;
      } else {
        accountsOfParty = unpreparedData.filter(data => data.party == party);
      }

      let dataSetForAccount = this.createDataSetForAccount(labels, accountsOfParty);
      dataSetForAccount.label = party;
      dataSetForAccount.borderColor = getColorForParty(party === 'CDU/CSU' ? Parties.csu : party);
      preparedDataSet.push(dataSetForAccount);
    }

    this.preparedData = preparedDataSet;
    this.preparedLabels = labels;
    this.adaptDataToSelection();
  }

  createDataSetForAccount(labels: string[], dataSet: TweetCount[]) {
    let values: number[] = [];

    for (let month of labels){
      let countsOfMonth: number = dataSet.filter(data => {
        let date = this.datepipe.transform(new Date(data.year, data.month), 'yyyy-MM-dd');
          return date === month
      }).map( data => data.total)
        .reduce((prev, curr) => prev + curr);
      values.push(countsOfMonth);
    }
     return {data: values, fill: false} as ChartData
  }

  generateAccountNames(parties: Parties[]): string[] {
    let labels = parties.map(value => value.toString());
    let indexCDU = labels.indexOf(Parties.cdu);
    let indexCSU = labels.indexOf(Parties.csu);
    if (indexCDU > -1 && indexCSU > -1 ) {
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

  initChart() {
    let self = this;
    window.onload = function () {
      let canvas = <HTMLCanvasElement>document.getElementById('tweetCountChart');
      self.ctx = canvas.getContext('2d');
      self.chart = new Chart(self.ctx, {
        type: 'line',
        data: {},
        options: self.chartOptions
      });
      self.chart.update();
    };
  }

  //TODO: Date for combination of startyear and startmonth isn't created - i don't know why
  createLabels(startYear: number, startMonth: number, endYear: number, endMonth: number) {
    let range = function(start, end): number[] {
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
          labels.push(this.datepipe.transform(new Date(year, month), 'yyyy-MM-dd'));
        }
      }
    }
    return labels;
  }
}

export class ChartData {
  data: number[];
  label: string;
  borderColor: string;
  fill: boolean;
}

