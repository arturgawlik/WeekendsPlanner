import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AlertModule } from 'ngx-bootstrap/alert';
import { AgmCoreModule } from '@agm/core';
import { ModalModule } from 'ngx-bootstrap/modal';

import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';

import { AuthService } from './services/auth/auth.service';

import { AppComponent } from './app.component';
import { ShellComponent } from './components/shell/shell.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth/auth.guard';
import { ShellGuard } from './guards/shell/shell.guard';
import { HomeComponent } from './components/home/home.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { FeatherIconsPipe } from './pipes/FeatherIcons/feather-icons.pipe';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducers, initialState, effects } from './app.state';
import { UpcomingTripsService } from './services/upcomingTrips/upcomingTrips.service';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { PlanNewComponent } from './components/plan-new/plan-new.component';
import { GeoDataService } from './services/mediaWiki/geoData/geoData.service';
import { WikiInfoService } from './services/mediaWiki/info/wikiInfo.service';
import { PlanTripComponent } from './components/plan-trip/plan-trip.component';



@NgModule({
  declarations: [
    AppComponent,
    ShellComponent,
    LoginComponent,
    HomeComponent,
    SignUpComponent,
    NavBarComponent,
    SideBarComponent,
    FeatherIconsPipe,
    PlanNewComponent,
    PlanTripComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AppRoutingModule,
    AlertModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forRoot(reducers, { initialState }),
    EffectsModule.forRoot(effects),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    AgmCoreModule.forRoot({ apiKey: environment.googleMapsAPIKey }),
    ModalModule.forRoot(),
    HttpClientModule,
    HttpClientJsonpModule
  ],
  providers: [
    AuthService,
    AuthGuard,
    ShellGuard,
    UpcomingTripsService,
    GeoDataService,
    WikiInfoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
