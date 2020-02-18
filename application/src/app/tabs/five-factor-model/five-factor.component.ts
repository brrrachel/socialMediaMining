import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {AccessService} from "../../services/access.service";
import {Parties} from "../../models/party.model";
import * as Chart from 'chart.js'
import {Timespan} from "../../models/time-span.model";

@Component({
  selector: 'app-five-factor',
  templateUrl: './five-factor.component.html',
  styleUrls: ['./five-factor.component.css']
})

export class FiveFactorComponent implements OnInit, OnChanges {

  labels: string[] = ["Openness", "Conscientiousness", "Extraversion", "Agreeableness", "Neuroticism"];

  accessService: AccessService;
  partiesEnum = Parties;

  @Input() selectedParties: Parties[];
  @Input() selectedYears: Timespan;

  chart;
  ctx: CanvasRenderingContext2D;
  chartOptions: Chart.ChartOptions = {
    title: {
      display: true
    }
  };

  datasets: RadarChartData[] = [
    {
      label: "1950",
      fill: true,
      backgroundColor: "rgba(179,181,198,0.2)",
      borderColor: "rgba(179,181,198,1)",
      pointBorderColor: "#fff",
      pointBackgroundColor: "rgba(179,181,198,1)",
      data: [8.77, 55.61, 21.69, 6.62, 6.82]
    }, {
      label: "2050",
      fill: true,
      backgroundColor: "rgba(255,99,132,0.2)",
      borderColor: "rgba(255,99,132,1)",
      pointBorderColor: "#fff",
      pointBackgroundColor: "rgba(255,99,132,1)",
      data: [25.48, 54.16, 7.61, 8.06, 4.45]
    }
  ];

  constructor(accessService: AccessService) {
    this.accessService = accessService;
  }

  ngOnInit() {
    this.initChart();
  }

  ngOnChanges() {
    if (this.chart) {
      this.chart.data.datasets = this.datasets;
      this.chart.update();
    }
  }

  initChart() {
    let canvas = <HTMLCanvasElement>document.getElementById('fiveFactorChart');
    this.ctx = canvas.getContext('2d');
    this.chart = new Chart(this.ctx, {
      type: 'radar',
      data: {
        labels: this.labels,
        datasets: []
      },
      options: this.chartOptions
    });
    this.chart.update();
  }
}

export class RadarChartData {
  label: string;
  fill: boolean;
  backgroundColor: string;
  borderColor: string;
  pointBorderColor: string;
  pointBackgroundColor: string;
  data: number[];

}


