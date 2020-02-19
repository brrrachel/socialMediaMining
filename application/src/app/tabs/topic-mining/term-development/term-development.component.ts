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
    legend: {
      onClick: (e) => e.stopPropagation()
    },
    scales: {
      xAxes: [{
        type: 'time',
        time: {
          unit: 'month'
        }
      }],
      yAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'likelihood of occurrence over all terms'
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
    this.accessService.getFrequencyForTopic(this.currentSearchTerm, this.selectedParties, this.selectedYears)
      .then(data => this.prepareData(data));
  }

  private prepareData(data: { party: string, frequency: TopicFrequencyModel[] }[]) {
    const labels = createLabels(this.selectedYears);
    let preparedDataSet: ChartData[] = new Array<ChartData>();
    let allAccountNames: string[] = data.map(data => data.party);

    for (let party of allAccountNames) {
      const partyDataFrequency: any[] = data.filter(data => data.party == party)[0].frequency;
      let dataSetForAccount = this.createDataSetForAccount(labels, partyDataFrequency);

      dataSetForAccount.label = party;
      dataSetForAccount.borderColor = getColorForParty(party === 'CDU/CSU' ? Parties.csu : party);
      preparedDataSet.push(dataSetForAccount);
    }

    this.chart.data.labels = labels;
    this.chart.data.datasets = preparedDataSet;
    this.chart.update();

  }

  createDataSetForAccount(labels: string[], dataSet: any[]) {
    let values: number[] = [];

    for (let month of labels) {
      let dataOfMonth = dataSet.filter(data => {
        let date = this.datepipe.transform(new Date(data.year, data.month), 'yyyy-MM-dd');
        return date === month
      });
      if (dataOfMonth.length === 1) {
        values.push(dataOfMonth[0].frequency);
      } else {
        values.push(0);
      }
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

  handleKeyPress(keyboardEvent: KeyboardEvent, searchTerm: string) {
    if (keyboardEvent.key === 'Enter') {
      this.handleInputTerm(searchTerm);
    }
  }
}
