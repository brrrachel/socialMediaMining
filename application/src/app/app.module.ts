import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {PartySelectionComponent} from './party-selection/party-selection.component';
import {NgxBootstrapSliderModule} from 'ngx-bootstrap-slider';
import { TimelineComponent } from './timeline/timeline.component';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    PartySelectionComponent,
    TimelineComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxBootstrapSliderModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
