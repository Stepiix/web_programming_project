import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AlleventsComponent } from './allevents/allevents.component';
import { MycartComponent } from './mycart/mycart.component';
import { RegisterComponent } from './register/register.component';
import { LoginGuard } from './guards/login-guard.guard';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent }, // home page route
  { path: 'allevents', component: AlleventsComponent },
  { path: 'mycart', component: MycartComponent , canActivate: [LoginGuard]},
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfilePageComponent }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
