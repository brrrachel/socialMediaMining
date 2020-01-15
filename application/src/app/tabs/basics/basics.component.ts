import {Component, OnChanges, OnInit, SimpleChanges, Input} from '@angular/core';
import {AccessService, tweetsPerAccount} from "../../services/access.service";
import {Parties} from "../../models/party.model";
import * as Chart from 'chart.js'

@Component({
  selector: 'app-basics',
  templateUrl: './basics.component.html',
  styleUrls: ['./basics.component.css']
})
export class BasicsComponent implements OnInit, OnChanges {

  accessService: AccessService;
  loadedData;
  data: ChartData[];

  @Input() selectedParties: Parties[];
  @Input() selectedYears: [number, number];

  currentParties: Parties[] = [];
  currentYears: [number, number] = [2009, 2019];

  chart: Chart;
  ctx: CanvasRenderingContext2D;

  preparedLabels: Date[] = [];
  preparedData: ChartData[] = [];

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

  constructor(public access: AccessService) {
    this.accessService = access;
    this.initChart();
  }

  ngOnInit() {
    this.accessService.getTweetCount().then(value => {
      this.loadedData = value;
      console.log('loadedData', value);
      //this.data = this.prepareData(loadedData);
      //this.adaptDataToSelection();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
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
    let newData: ChartData[] = new Array<ChartData>();
    let newLabels: Date[] = new Array<Date>();
  }

  prepareData(unpreparedData: tweetsPerAccount[]) {
    let preparedDataSet: ChartData[] = new Array<ChartData>();

    for (let label of this.getAccountNames(unpreparedData)) {
      //this.createDataSetForAccount(label);
      //preparedDataSet.push({data: sortedValues.map(data => data.total), label: label, fill: false} as ChartData);
    }

    this.preparedData = preparedDataSet;
    return preparedDataSet;
  }

  createDataSetForAccount(party: string, start, end) {
    /**let sortedValues = unpreparedData
     .filter(data => data.account_name === party)
     .sort((data1, data2) => {
        let sorted = moment(data1.start) > moment(data2.start) ? 1 : -1;
        return sorted;
      });
     this.preparedLabels = this.preparedLabels ? this.preparedLabels : sortedValues.map(data => new Date(data.start));
     return {data: sortedValues.map(data => data.total), label: label, fill: false} as ChartData */
  }

  getAccountNames(data): string[] {
    let labels = new Array<string>();
    for (let account of data.map(data => data.account_name)) {
      if (labels.indexOf(account) === -1) {
        labels.push(account);
      }
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

    };
  }

}

export class ChartData {
  data: number[];
  label: string;
  fill: boolean;
}

