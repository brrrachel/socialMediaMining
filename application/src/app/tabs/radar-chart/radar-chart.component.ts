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

  fdp = new Party({name:'FDP',openess: 3,conscientiousness: 2.5, extraversion: 5, agreeableness: 2.4, neuroticism: 1.8, color: 'rgb(255,237,0)'});
  spd = new Party({name:'SPD',openess: 2.4,conscientiousness: 4.7, extraversion: 1.3, agreeableness: 2.8, neuroticism: 4.0, color: 'rgb(227,0,15)'});
  cdu = new Party({name:'CDU',openess: 2.7,conscientiousness: 1.1, extraversion: 2.7, agreeableness: 3.8, neuroticism: 2.8, color: 'rgb(0,0,0)'});
  linke = new Party({name:'Die Linke',openess: 2.4,conscientiousness: 4.7, extraversion: 1.3, agreeableness: 1.4, neuroticism: 2.8, color: 'rgb(189,0,0)'});
  gruene = new Party({name:'Bündnis 90/Die Grünen',openess: 5,conscientiousness: 4.7, extraversion: 1.8, agreeableness: 2.8, neuroticism: 2.8, color: 'rgb(100,161,45)'});
  afd = new Party({name:'AfD',openess: 0.1,conscientiousness: 3.1, extraversion: 1.3, agreeableness: 5.0, neuroticism: 2.8, color: 'rgb(0,102,153)'});
  parties = [this.fdp,this.spd,this.cdu,this.linke,this.gruene,this.afd];
  @ViewChild('container') radarContainer: ElementRef;

  private htmlElement: HTMLElement;

  constructor(private chartService: RadarChartService) { }

  ngOnInit() {
    this.htmlElement = this.radarContainer.nativeElement;
    this.chartService.setup(this.htmlElement);
  }

  ngAfterViewInit() {
    this.chartService.populate(this.parties);
  }

  /**
   * Repopulate the graph when @Input changes
   **/
  ngOnChanges(): void {
    this.chartService.populate(this.parties);
  }

}
