import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/mainPage/home/home.component';
import { EventsComponent } from './components/eventPage/events/events.component';
import { AdminComponent } from './components/admin/admin.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { SigninComponent } from './components/auth/signin/signin.component';
import { VerifyEmailComponent } from './components/auth/verify-email/verify-email.component';
import { ForgotPasswordComponent } from './components/auth/forgot-password/forgot-password.component';
import { ContactComponent } from './components/contact/contact.component';
import { BusinessComponent } from './components/eventPage/business/business.component';
import { SelfImproveComponent } from './components/eventPage/self-improve/self-improve.component';
import { TechnologyComponent } from './components/eventPage/technology/technology.component';
import { SportComponent } from './components/eventPage/sport/sport.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', redirectTo: '' },
  { path: 'events', component: EventsComponent }, 
  { path: 'admin', component: AdminComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'verifyemail', component: VerifyEmailComponent },
  { path: 'forgotpassword', component: ForgotPasswordComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'business', component: BusinessComponent },
  { path: 'selfImprove', component: SelfImproveComponent },
  { path: 'technology', component: TechnologyComponent },
  { path: 'sport', component: SportComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
