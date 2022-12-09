import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {AppRoutingModule} from "./app-routing.module";
import {QuizzComponent} from './quizz/quizz.component';
import {HomepageComponent} from './homepage/homepage.component';
import {InfoCardComponent} from './components/info-card/info-card.component';
import {ActionButtonComponent} from './components/action-button/action-button.component';
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
    QuizzComponent,
    HomepageComponent,
    InfoCardComponent,
    ActionButtonComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
