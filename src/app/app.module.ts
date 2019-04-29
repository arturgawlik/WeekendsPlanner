import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';

import { AuthService } from './services/auth/auth.service';

import { AppComponent } from './app.component';
import { ShellComponent } from './components/shell/shell.component';
import { LoginComponent } from './components/login/login.component';
import { UserService } from './services/user/user.service';
import { AuthGuard } from './guards/auth/auth.guard';
import { ShellGuard } from './guards/shell/shell.guard';



@NgModule({
  declarations: [
    AppComponent,
    ShellComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule
  ],
  providers: [
    AuthService,
    UserService,
    AuthGuard,
    ShellGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
