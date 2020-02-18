import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {AccessService} from "../../services/access.service";
import {getColorForParty, Parties} from "../../models/party.model";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";

@Component({
  selector: 'app-five-factor',
  templateUrl: './five-factor.component.html',
  styleUrls: ['./five-factor.component.css']
})

export class FiveFactorComponent implements OnInit, OnChanges {

  chart;
  chartData;
  accessService: AccessService;

  @Input() selectedParties: Parties[];
  @Input() selectedYears: [number, number];

  currentParties: Parties[] = [];
  currentYears: [number, number] = [2009, 2019];

  constructor(accessService: AccessService) {
    this.accessService = accessService;
  }

  ngOnInit() {
    this.chart = am4core.create("five-factor", am4charts.RadarChart);
    this.chartData = [{
      "country": "Lithuania",
      "litres": 501
    }, {
      "country": "Czechia",
      "litres": 301
    }, {
      "country": "Ireland",
      "litres": 266
    }, {
      "country": "Germany",
      "litres": 165
    }, {
      "country": "Australia",
      "litres": 139
    }, {
      "country": "Austria",
      "litres": 336
    }, {
      "country": "UK",
      "litres": 290
    }, {
      "country": "Belgium",
      "litres": 325
    }, {
      "country": "The Netherlands",
      "litres": 40
    }];
    //this.getData();
    this.createChart()
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
    if (hasChanged && this.currentParties) {
      //this.getData();
      this.createChart()
    }
  }

  createChart(): void {
    /* Create axes */
    const categoryAxis = this.chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "country";

    const valueAxis = this.chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.renderer.axisFills.template.fill = this.chart.colors.getIndex(2);
    valueAxis.renderer.axisFills.template.fillOpacity = 0.05;

    /* Create and configure series */
    const series = this.chart.series.push(new am4charts.RadarSeries());
    series.dataFields.valueY = "litres";
    series.dataFields.categoryX = "country";
    series.name = "Sales";
    series.strokeWidth = 3;
  }
}


