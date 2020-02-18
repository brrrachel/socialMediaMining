import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {DatePipe} from '@angular/common'
import {AccessService} from "../../services/access.service";
import {getColorForParty, Parties} from "../../models/party.model";
import * as Chart from 'chart.js'
import {TweetCount} from "../../models/tweetCount.model";
import {getMonthFromDatePoint, MAX_TIMESPAN, TimeSpan} from "../../models/time-span.model";
import {range} from "../../shared/helper-functions";

@Component({
  selector: 'app-basics',
  templateUrl: './basics.component.html',
  styleUrls: ['./basics.component.css']
})
export class BasicsComponent implements OnInit, OnChanges {

  partiesEnum = Parties;

  @Input() selectedParties: Parties[] = [];
  @Input() selectedYears: TimeSpan = MAX_TIMESPAN;

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
  }

  ngOnInit() {
    this.initChart();
    this.access.getTweetCount().then(value => {
      this.prepareData(value);
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedParties'] || changes['selectedYears']) {
      this.adaptDataToSelection();
    }
  }

  adaptDataToSelection() {
    if (this.preparedData) {
      let newDataSet: ChartData[] = [];
      let newLabels: string[] = this.createLabels();
      let accountNames: string[] = this.generateAccountNames(this.selectedParties);

      for (let set of this.preparedData) {
        if (accountNames.indexOf(set.label) > -1) {
          let newData = {
            label: set.label,
            data: [],
            borderColor: getColorForParty(set.label === 'CDU/CSU' ? Parties.csu : set.label),
            fill: false
          } as ChartData;
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
    let labels: string[] = this.createLabels();
    let preparedDataSet: ChartData[] = new Array<ChartData>();
    const party_keys = Object.keys(Parties);
    let allAccountNames: string[] = this.generateAccountNames(party_keys.map(k => Parties[k as any]));
    allAccountNames.push('CDU', 'CSU');

    for (let party of allAccountNames) {

      let accountsOfParty: TweetCount[];
      if (party === 'CDU/CSU') {
        let dataCDU = unpreparedData.filter(data => data.party == 'CDU');
        let dataCSU = unpreparedData.filter(data => data.party == 'CSU');
        accountsOfParty = dataCDU;
        accountsOfParty.concat(dataCSU);
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

    for (let month of labels) {
      let countsOfMonth: number = dataSet.filter(data => {
        let date = this.datepipe.transform(new Date(data.year, data.month), 'yyyy-MM-dd');
        return date === month
      }).map(data => data.total)
        .reduce((prev, curr) => prev + curr, 0);
      values.push(countsOfMonth);
    }
    return {data: values, fill: false} as ChartData
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

  initChart() {
    let canvas = <HTMLCanvasElement>document.getElementById('tweetCountChart');
    this.ctx = canvas.getContext('2d');
    this.chart = new Chart(this.ctx, {
      type: 'line',
      data: {},
      options: this.chartOptions
    });
    this.chart.update();
  }

  createLabels() {
    const startYear = this.selectedYears.startTime.year;
    const startMonth = getMonthFromDatePoint(this.selectedYears.startTime);
    const endYear = this.selectedYears.endTime.year;
    const endMonth = 3;


    const labels: string[] = [];
    const months: number[] = range(startMonth, 12);
    const years: number[] = range(startYear, endYear);
    for (let year of years) {
      for (let month of months) {
        if (year < 2019 || (year === 2019 && month <= endMonth)) {
          labels.push(this.datepipe.transform(new Date(year, month - 1), 'yyyy-MM-dd'));
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

