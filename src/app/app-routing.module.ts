import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {QuizzComponent} from "./quizz/quizz.component";
import {HomepageComponent} from "./homepage/homepage.component";

const routes: Routes = [
  {path: 'quizz', component: QuizzComponent},
  {path: '', component: HomepageComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}
