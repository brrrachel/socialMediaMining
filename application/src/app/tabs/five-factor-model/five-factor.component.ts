import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {AccessService, fiveFactorModel} from "../../services/access.service";
import {getColorForParty, Parties} from "../../models/party.model";
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
    },
    legend: {
      onClick: (e) => e.stopPropagation()
    },
    scale:{
      ticks: {
        suggestedMin: 0,
        suggestedMax: 5
      }
    }
  };

  constructor(accessService: AccessService) {
    this.accessService = accessService;
  }

  ngOnInit() {
    this.initChart();
  }

  ngOnChanges() {
    if (this.chart) {
      this.getData();
    }
  }

  hexToRgbA(hex, alpha){
    let c;
    if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
      c= hex.substring(1).split('');
      if(c.length== 3){
        c= [c[0], c[0], c[1], c[1], c[2], c[2]];
      }
      c= '0x'+c.join('');
      return 'rgba('+[(c>>16)&255, (c>>8)&255, c&255].join(',')+',' + alpha + ')';
    }
    throw new Error('Bad Hex');
  }

  getData(){
    this.accessService.getFiveFactors(this.selectedParties, this.selectedYears)
      .then(data => this.setChartData(data));
  }

  setChartData(data: { party: string, factors: fiveFactorModel}[]){
    let dataSets: RadarChartData[] = [];
    if(data.length >= 0){
      for (let partyData of data){
        console.log(partyData);
        let partyName = partyData.party;
        let partyEnum = "";
        if (partyName === "CDU/CSU"){
          partyEnum = "CDU"
        } else {
          partyEnum = partyName
        }
        let fiveFactors = partyData.factors[0];
        let partyColor = this.hexToRgbA(getColorForParty(partyEnum),"1");
        let partyColorOpac = this.hexToRgbA(getColorForParty(partyEnum),"0.2");
        dataSets.push({
          label: partyName,
          fill: true,
          backgroundColor: partyColorOpac,
          borderColor: partyColor,
          pointBorderColor: partyColor,
          pointBackgroundColor: partyColor,
          data: [fiveFactors.openness, fiveFactors.conscientiousness, fiveFactors.extraversion, fiveFactors.agreeableness, fiveFactors.neuroticism]
        })
      }
    }
    console.log(this.selectedYears);
    console.log(dataSets);
    this.chart.data.datasets = dataSets;
    this.chart.update();
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
    this.getData();
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
