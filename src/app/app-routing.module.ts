import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/mainPage/home/home.component';
import { EventsComponent } from './components/eventPage/events/events.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { SigninComponent } from './components/auth/signin/signin.component';
import { VerifyEmailComponent } from './components/auth/verify-email/verify-email.component';
import { ForgotPasswordComponent } from './components/auth/forgot-password/forgot-password.component';
import { ContactComponent } from './components/contact/contact.component';
import { EventDetailsComponent } from './components/oneEvent/event-details/event-details.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AuthGuard } from './guards/auth.guard';
import { CoursesComponent } from './components/coursesPage/courses/courses.component';
import { OrganizersComponent } from './components/mainPage/organizers/organizers.component';
import { NewsletterComponent } from './components/mainPage/newsletter/newsletter.component';



const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'events', component: EventsComponent },
  { path: 'courses', component: CoursesComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'verifyemail', component: VerifyEmailComponent },
  { path: 'forgotpassword', component: ForgotPasswordComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'newsletter', component: NewsletterComponent },
  { path: 'organizers', component: OrganizersComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'event/:type/:id', component: EventDetailsComponent },
  { path: '**', component: HomeComponent },
];



@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'top',
    }),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
