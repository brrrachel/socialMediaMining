import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {AccessService} from "../../../services/access.service";
import {getColorForParty, Parties, PartyColors} from "../../../models/party.model";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import * as am4plugins_forceDirected from "@amcharts/amcharts4/plugins/forceDirected";

const limitTopics = 5;

@Component({
  selector: 'app-term-frequency',
  templateUrl: './term-frequency.component.html',
  styleUrls: ['./term-frequency.component.css']
})
export class TermFrequencyComponent implements OnInit, OnChanges {

  accessService: AccessService;

  chart;
  chartData;

  @Input() selectedParties: Parties[];
  @Input() selectedYears: [number, number];

  currentParties: Parties[] = [];
  currentYears: [number, number] = [2009, 2019];

  constructor(accessService: AccessService) {
    this.accessService = accessService;
  }

  ngOnInit() {
    this.chart = am4core.create("term-frequency", am4plugins_forceDirected.ForceDirectedTree);
    this.chartData = this.chart.series.push(new am4plugins_forceDirected.ForceDirectedSeries());
    this.chartData.series.dataFields.color = "color";
    this.getData();
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
      this.getData();
    }
  }

  getData() {
    const start = new Date(this.currentYears[0], 0, 1);
    const end = new Date(this.currentYears[1], 12, 31);
    this.accessService.getTopics(this.currentParties, start, end).then(data => {
      this.createChart(data);
    });
  }

  createChart(data: {party: string, terms: any}[]) {

    this.chartData.data = [];

    for (let d of data) {

      for (let i=0; i < limitTopics; i++) {
        const term = d.terms[i];
        let nodeAlreadyExist = this.chartData.data.find(node => node.name == term.term);
        if(!nodeAlreadyExist) {
          const children: NodeChild[] = [];
          children.push({name: d.party, value: term.tfidf, color: getColorForParty(d.party)} as NodeChild);

          for (let otherData of data) {
            const matchingTerm = otherData.terms.find(element => element.term === term.term);
            if(d.party !== otherData.party && matchingTerm) {
              const newChild: NodeChild = {name: otherData.party, value: matchingTerm.tfidf, color: getColorForParty(otherData.party)};
              children.push(newChild);
            }
          }
          this.chartData.data.push({name: term.term, children: children} as NodeParent);
        }
      }

    }

    this.chartData.data = [...this.chartData.data];

    this.chartData.dataFields.linkWith = "linkWith";
    this.chartData.dataFields.name = "name";
    this.chartData.dataFields.id = "name";
    this.chartData.dataFields.value = "value";
    this.chartData.dataFields.children = "children";

    this.chartData.nodes.template.tooltipText = "{name}:s {value}";
    this.chartData.nodes.template.fillOpacity = 1;

    this.chartData.nodes.template.label.text = "{name}";
    this.chartData.fontSize = 8;
    this.chartData.maxLevels = 2;
    this.chartData.maxRadius = am4core.percent(6);
    this.chartData.manyBodyStrength = -16;
    this.chartData.nodes.template.label.hideOversized = true;
    this.chartData.nodes.template.label.truncate = true;
  }

}


export interface NodeChild {
  name: string;
  value: number;
  color: string;
}

export interface NodeParent {
  name: string;
  children: NodeChild[]
}

