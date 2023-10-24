import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { EventsComponent } from './components/events/events.component';
import { AdminComponent } from './components/admin/admin.component';
import { SignupComponent } from './components/signup/signup.component';
import { SigninComponent } from './components/signin/signin.component';
import { PasswordComponent } from './components/password/password.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';

const routes: Routes = [
  {path:'home', component:HomeComponent},
  {path:'events', component:EventsComponent},
  {path:'admin', component:AdminComponent},
  {path:'signup', component:SignupComponent},
  {path:'signin', component:SigninComponent},
  {path:'forgotpassword', component:PasswordComponent},
  {path:'verifyemail', component:VerifyEmailComponent},




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
