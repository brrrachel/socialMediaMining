import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {DatePipe} from '@angular/common'
import {ChartsModule} from 'ng2-charts';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {PartySelectionComponent} from './party-selection/party-selection.component';
import {NgxBootstrapSliderModule} from 'ngx-bootstrap-slider';
import {TimelineComponent} from './timeline/timeline.component';
import {HttpClientModule} from '@angular/common/http';
import {BasicsComponent} from './tabs/basics/basics.component';
import {RadarChartComponent} from "./tabs/five-factor-model/radar-chart.component";
import {TermFrequencyComponent } from './tabs/topic-mining/term-frequency/term-frequency.component';

@NgModule({
  declarations: [
    AppComponent,
    PartySelectionComponent,
    TimelineComponent,
    BasicsComponent,
    RadarChartComponent,
    TermFrequencyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxBootstrapSliderModule,
    HttpClientModule,
    ChartsModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule {
}
