import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {AccessService} from "../../../services/access.service";
import {getColorForParty, Parties} from "../../../models/party.model";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4plugins_forceDirected from "@amcharts/amcharts4/plugins/forceDirected";
import {MAX_TIMESPAN, Timespan} from "../../../models/time-span.model";

const limitTopics = 5;

@Component({
  selector: 'app-term-frequency',
  templateUrl: './term-frequency.component.html',
  styleUrls: ['./term-frequency.component.css']
})
export class TermFrequencyComponent implements OnInit, OnChanges {

  chart;
  chartData;

  @Input() selectedParties: Parties[] = [];
  @Input() selectedYears: Timespan = MAX_TIMESPAN;

  constructor(private accessService: AccessService) {
  }

  ngOnInit() {
    this.chart = am4core.create("term-frequency", am4plugins_forceDirected.ForceDirectedTree);
    this.chartData = this.chart.series.push(new am4plugins_forceDirected.ForceDirectedSeries());
    this.getData();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedParties'] || changes['selectedYears']) {
      this.getData();
    }
  }

  getData() {
    this.accessService.getTopics(this.selectedParties, this.selectedYears).then(data => {
      this.createChart(data);
    });
  }

  createChart(data: { party: string, terms: any }[]) {

    this.chartData.data = [];

    let cduAndCsuInData: Boolean = false;
    if (data.filter(dataSet => dataSet.party === "CDU" || dataSet.party === "CSU").length === 2) {
      cduAndCsuInData = true;
    }

    for (let d of data) {
      for (let i = 0; i < limitTopics; i++) {

        const term = d.terms[i];
        let nodeAlreadyExist = this.chartData.data.find(node => node.name === term.term);

        if (!nodeAlreadyExist) {
          const children: Node[] = [];

          if (cduAndCsuInData) {
            const parentChild: Node = this.createParentNodeForCsuCdu(data, term);
            if (parentChild) {
              children.push(parentChild);
            }
          }

          for (let otherData of data) {
            if ((cduAndCsuInData && otherData.party !== "CSU" && otherData.party !== 'CDU') || (!cduAndCsuInData)) {
              const matchingTerm = otherData.terms.find(element => element.term === term.term);
              if (matchingTerm) {
                children.push({
                  name: otherData.party,
                  value: matchingTerm.tfidf,
                  color: getColorForParty(otherData.party)
                } as NodeChild);
              }
            }
          }

          this.chartData.data.push({name: term.term, children: children, color: "grey"} as NodeParent);
        }
      }
    }

    this.chartData.data = [...this.chartData.data];

    this.chartData.dataFields.linkWith = "linkWith";
    this.chartData.dataFields.name = "name";
    this.chartData.dataFields.id = "name";
    this.chartData.dataFields.value = "value";
    this.chartData.dataFields.children = "children";
    this.chartData.dataFields.color = "color";

    this.chartData.nodes.template.tooltipText = "{name}: {value}";
    this.chartData.nodes.template.fillOpacity = 1;

    this.chartData.nodes.template.label.text = "{name}";
    this.chartData.fontSize = 8;
    this.chartData.maxLevels = 2;
    this.chartData.maxRadius = am4core.percent(6);
    this.chartData.manyBodyStrength = -16;
    this.chartData.nodes.template.label.hideOversized = true;
    this.chartData.nodes.template.label.truncate = true;
  }

  private createParentNodeForCsuCdu(allData, currentTerm): Node {

    const dataCdu = allData.find(dataSet => dataSet.party === "CDU").terms.find(term => term.term === currentTerm.term);
    const dataCsu = allData.find(dataSet => dataSet.party === "CSU").terms.find(term => term.term === currentTerm.term);

    const childCdu: NodeChild = dataCdu ? {
      name: 'CDU',
      value: dataCdu.tfidf,
      color: getColorForParty(dataCdu.party)
    } : null;
    const childCsu: NodeChild = dataCsu ? {
      name: 'CSU',
      value: dataCsu.tfidf,
      color: getColorForParty(dataCsu.party)
    } : null;

    if (childCdu && !childCsu) {
      return childCdu;
    } else if (!childCdu && childCsu) {
      return childCsu;
    } else if (childCdu && childCsu) {
      return ({
        name: "CDU/CSU",
        children: [childCdu, childCsu],
        color: getColorForParty(dataCdu.party)
      } as NodeParent);
    } else {
      return null;
    }
  }
}


export interface NodeChild extends Node {
  value: number;
}

export interface NodeParent extends Node {
  children: Node[];
}

export interface Node {
  name: string;
  color: string;
}

