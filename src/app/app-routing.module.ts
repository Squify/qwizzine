import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TestComponent} from "./test/test.component";
import {HomepageComponent} from "./homepage/homepage.component";

const routes: Routes = [
  { path: 'test', component: TestComponent },
  { path: '', component: HomepageComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
