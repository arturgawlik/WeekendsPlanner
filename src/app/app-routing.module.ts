import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShellComponent } from './components/shell/shell.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth/auth.guard';
import { ShellGuard } from './guards/shell/shell.guard';
import { HomeComponent } from './components/home/home.component';
// import * from "firebase";

const routes: Routes = [
  {
    path: '',
    component: ShellComponent, 
    children: [
      {path: '', redirectTo: 'home', pathMatch: 'full'},
      {path: 'home', component: HomeComponent},
    ],
    canActivate: [ShellGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
