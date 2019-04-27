import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShellComponent } from './src/app/components/shell/shell.component';
import { LoginComponent } from './src/app/components/login/login.component';

const routes: Routes = [
  {
    path: '',
    component: ShellComponent, 
    children: []
  },
  {
    path: 'login',
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
