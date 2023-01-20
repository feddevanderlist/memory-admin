import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {AggregateComponent} from "./components/aggregate/aggregate.component";

const routes: Routes = [
  {path: "", component: LoginComponent},
  {path: "home", component: AggregateComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
