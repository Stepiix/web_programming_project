import { Component } from '@angular/core';
import { AuthService } from '../services/auth/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  ePattern = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
  pwPattern =/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;

  email: string = "";
  password: string = "";  

  constructor(private router: Router, private authService: AuthService) { }

  login(): void{
    this.email = (document.getElementById("email") as HTMLInputElement).value
    this.password = (document.getElementById("password") as HTMLInputElement).value

    this.authService.login(this.email, this.password).subscribe((user : any)=>{
      if (user && user.token) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.authService.isAdmin(this.email).subscribe((isAdmin : any)=>{
            if (isAdmin == null) 
              alert('There\'s no admin response')
            localStorage.setItem('isAdmin', JSON.stringify(isAdmin.admin));
            this.router.navigate(['allevents']);
        })
      }
      }, (error: any) => {
        if (error.status == 404)
          alert('User not found');
        else  // Other error cases
          alert('An error occurred during login.');
    })
  }

  validate() {
    this.email = (document.getElementById("email") as HTMLInputElement).value;
    this.password = (document.getElementById("password") as HTMLInputElement).value;

    if (this.email != "") {
      if (this.password != "") {
        if (this.ePattern.test(this.email)) {
          if (this.pwPattern.test(this.password) && this.password.length >= 8) {
            this.login();
          } else { alert("Password must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"); }
        } else { alert("Please insert a real email"); }
      } else { alert("Password is required !"); }
    } else { alert("Email is required!"); }   
  }

  triggerLogin(): void {
    const loginButton = document.querySelector('button');
    if (loginButton)
      loginButton.click();
  }
}
