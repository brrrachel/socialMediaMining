import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import { ChartsModule } from 'ng2-charts';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {PartySelectionComponent} from './party-selection/party-selection.component';
import {NgxBootstrapSliderModule} from 'ngx-bootstrap-slider';
import { TimelineComponent } from './timeline/timeline.component';
import {HttpClientModule} from '@angular/common/http';
import { BasicsComponent } from './tabs/basics/basics.component';

@NgModule({
  declarations: [
    AppComponent,
    PartySelectionComponent,
    TimelineComponent,
    BasicsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxBootstrapSliderModule,
    HttpClientModule,
    ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
