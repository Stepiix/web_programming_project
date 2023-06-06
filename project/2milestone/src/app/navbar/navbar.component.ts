import { Component } from '@angular/core';
import { AuthService } from '../services/auth/auth-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(private auth: AuthService){ }

  currentUserExists(): boolean {
    return localStorage.getItem('currentUser') == null;
  }

  logout() {
    this.auth.logout();
  }
}
