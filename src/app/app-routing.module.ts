import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '../app/account/login/login.component';
import { HomePageComponent } from './home/home-page/home-page.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [  
    { path: 'login', component: LoginComponent },
    { path: '',  redirectTo: '/home', pathMatch: 'full'  },
    { path: 'home',  component: HomePageComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
