import { TestBed, async } from '@angular/core/testing';
import { RadarChartComponent } from './radar-chart.component';
import {RadarChartService} from "./radar-chart.service";

describe('Component: RadarChart', () => {
  it('should create an instance', () => {
    let radarChartService = new RadarChartService();
    let component = new RadarChartComponent(radarChartService);
    expect(component).toBeTruthy();
  });
});
