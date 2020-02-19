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
import {TermFrequencyComponent } from './tabs/topic-mining/term-frequency/term-frequency.component';
import { TermDevelopmentComponent } from './tabs/topic-mining/term-development/term-development.component';
import {FiveFactorComponent} from "./tabs/five-factor-model/five-factor.component";
import { EventHintComponent } from './timeline/event-hint/event-hint.component';

@NgModule({
  declarations: [
    AppComponent,
    PartySelectionComponent,
    TimelineComponent,
    BasicsComponent,
    FiveFactorComponent,
    TermFrequencyComponent,
    TermDevelopmentComponent,
    EventHintComponent
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
