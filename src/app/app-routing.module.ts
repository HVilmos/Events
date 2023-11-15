import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/mainPage/home/home.component';
import { EventsComponent } from './components/eventPage/events/events.component';
import { AdminComponent } from './components/adminPage/admin/admin.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { SigninComponent } from './components/auth/signin/signin.component';
import { VerifyEmailComponent } from './components/auth/verify-email/verify-email.component';
import { ForgotPasswordComponent } from './components/auth/forgot-password/forgot-password.component';
import { ContactComponent } from './components/contact/contact.component';
import { BusinessComponent } from './components/eventPage/business/business.component';
import { SelfImproveComponent } from './components/eventPage/self-improve/self-improve.component';
import { TechnologyComponent } from './components/eventPage/technology/technology.component';
import { SportComponent } from './components/eventPage/sport/sport.component';
import { SelectedCategoriesComponent } from './components/eventPage/selected-categories/selected-categories.component';
import { AdminBusinessComponent } from './components/adminPage/admin-business/admin-business.component';
import { AdminSelfImprovmentComponent } from './components/adminPage/admin-self-improvment/admin-self-improvment.component';
import { AdminSportComponent } from './components/adminPage/admin-sport/admin-sport.component';
import { AdminTechnologyComponent } from './components/adminPage/admin-technology/admin-technology.component';
import { AdminFeaturedComponent } from './components/adminPage/admin-featured/admin-featured.component';
import { EventDetailsComponent } from './components/oneEvent/event-details/event-details.component';
import { ProfileComponent } from './components/profile/profile.component';



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
  { path: 'profile', component: ProfileComponent },
  {
    path: '',
    component: SelectedCategoriesComponent, 
    children: [
      { path: 'business', component: BusinessComponent },
      { path: 'selfImprove', component: SelfImproveComponent},
      { path: 'technology', component: TechnologyComponent },
      { path: 'sport', component: SportComponent },
    ]
  },
  {
    path: '',
    component: AdminComponent, 
    children: [
      { path: 'adminFeatured', component: AdminFeaturedComponent },
      { path: 'adminBusiness', component: AdminBusinessComponent },
      { path: 'adminSelfImprove', component: AdminSelfImprovmentComponent},
      { path: 'adminTechnology', component: AdminTechnologyComponent },
      { path: 'adminSport', component: AdminSportComponent },
    ]
  },
  { path: 'event/:type/:id', component: EventDetailsComponent },
  { path: '**', component: HomeComponent },

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
