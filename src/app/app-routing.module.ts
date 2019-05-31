import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShellComponent } from './components/shell/shell.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth/auth.guard';
import { ShellGuard } from './guards/shell/shell.guard';
import { HomeComponent } from './components/home/home.component';
import { PlanNewComponent } from './components/plan-new/plan-new.component';
import { PlanTripComponent } from './components/plan-trip/plan-trip.component';
import { LocalForecastComponent } from './local-forecast/local-forecast.component';

const routes: Routes = [
  {
    path: '',
    component: ShellComponent, 
    children: [
      {path: '', redirectTo: 'local-forecast', pathMatch: 'full'},
      {path: 'local-forecast', component: LocalForecastComponent},
      {path: 'plan-new', component: PlanNewComponent},
      {path: 'plan-trip', component: PlanTripComponent}
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
