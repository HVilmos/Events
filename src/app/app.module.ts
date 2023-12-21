import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AngularFireModule} from '@angular/fire/compat'
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';

import { HttpClientModule } from '@angular/common/http'; 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Environmets } from './environmets';
import { NavComponents } from './components/nav/nav.component';
import { HomeComponent } from './components/mainPage/home/home.component';
import { EventsComponent } from './components/eventPage/events/events.component';
import { FormsModule } from '@angular/forms';
import { SigninComponent } from './components/auth/signin/signin.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { VerifyEmailComponent } from './components/auth/verify-email/verify-email.component';
import { CategoriesComponent } from './components/mainPage/categories/categories.component';
import { IntroductionComponent } from './components/mainPage/introduction/introduction.component';
import { FeaturedComponent } from './components/mainPage/featured/featured.component';
import { ForgotPasswordComponent } from './components/auth/forgot-password/forgot-password.component';
import { ContactComponent } from './components/contact/contact.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SelectedCategoriesComponent } from './components/eventPage/selected-categories/selected-categories.component';
import { OrganizersComponent } from './components/mainPage/organizers/organizers.component';
import { FooterComponent } from './components/footer/footer.component';
import { EventDetailsComponent } from './components/oneEvent/event-details/event-details.component';
import { ProfileComponent } from './components/profile/profile.component';
import { TopComponent } from './components/mainPage/top/top.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponents,
    HomeComponent,
    EventsComponent,
    SigninComponent,
    SignupComponent,
    VerifyEmailComponent,
    CategoriesComponent,
    IntroductionComponent,
    FeaturedComponent,
    ForgotPasswordComponent,
    ContactComponent,
    SelectedCategoriesComponent,
    OrganizersComponent,
    FooterComponent,
    EventDetailsComponent,
    ProfileComponent,
    TopComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    AngularFireModule.initializeApp(Environmets.firebaseConfig),
    AngularFireDatabaseModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 

}
