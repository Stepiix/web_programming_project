import { SignupComponent } from './signup/signup.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AlleventsComponent } from './allevents/allevents.component';
import { MycartComponent } from './mycart/mycart.component';
import { RegisterComponent } from './register/register.component';
import { NavbarComponent } from './navbar/navbar.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'allevents', component: AlleventsComponent },
  { path: 'mycart', component: MycartComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'signup', component: SignupComponent },
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
