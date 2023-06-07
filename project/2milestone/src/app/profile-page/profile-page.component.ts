import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth/auth-service.service';
import { user } from '../models/user';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {
  userInfo: user = {
    _id: '',
    name: '',
    email: '',
    phonenumber: '',
    password: ''
  };

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    this.getInfo();
  }

  getInfo(): void {
    this.auth.getInfo().subscribe({
      next: (data: user) => {
        this.userInfo = data;
      },
      error: (err: any) => { }
    });
  }
}
