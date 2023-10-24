import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { EventsComponent } from './components/events/events.component';
import { AdminComponent } from './components/admin/admin.component';

const routes: Routes = [
  {path:'home', component:HomeComponent},
  {path:'events', component:EventsComponent},
  {path:'admin', component:AdminComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
