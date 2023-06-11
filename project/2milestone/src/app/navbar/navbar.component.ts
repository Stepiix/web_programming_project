import { Component } from '@angular/core';
import { AuthService } from '../services/auth/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(private auth: AuthService, private router: Router){ }

  currentUserExists(): boolean {
    return localStorage.getItem('currentUser') == null;
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['login']);
  }
}
