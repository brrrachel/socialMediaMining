import { Component, OnInit, ElementRef, ViewChild, AfterViewInit, OnChanges, Input } from '@angular/core';
import { Party } from './parties';
import { RadarChartService } from './radar-chart.service';
import {element} from "protractor";


@Component({
  selector: 'app-radar-chart',
  templateUrl: './radar-chart.component.html',
  styleUrls: ['./radar-chart.component.scss']
})
export class RadarChartComponent implements OnInit, OnChanges, AfterViewInit  {

  fdp = new Party({name:'FDP',openess: 3,conscientiousness: 2.5, extraversion: 1, agreeableness: 2.4, neuroticism: 1.8})
  spd = new Party({name:'SPD',openess: 2.4,conscientiousness: 4.7, extraversion: 1.3, agreeableness: 2.8, neuroticism: 2.8})
  parties = [this.fdp,this.spd]
  @ViewChild('container') radarContainer: ElementRef;

  private htmlElement: HTMLElement;

  constructor(private chartService: RadarChartService) { }

  ngOnInit() {
    this.htmlElement = this.radarContainer.nativeElement;
    this.chartService.setup(this.htmlElement);
    this.chartService.populate(this.parties);
  }

  ngAfterViewInit() {
    this.chartService.populate(this.parties);
  }

  /**
   * Repopulate the graph when @Input changes
   **/
  ngOnChanges(): void {
    this.htmlElement = this.radarContainer.nativeElement;
    this.chartService.setup(this.htmlElement);
    this.chartService.populate(this.parties);
  }

}
