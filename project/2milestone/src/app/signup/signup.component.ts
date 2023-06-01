import { Component } from '@angular/core';
import { AuthService } from '../services/auth/auth-service.service';
import { user } from '../models/user';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  user: any;
  

  constructor(private authServive: AuthService) { }

  login(): void{
    let email = (document.getElementById("email") as HTMLInputElement).value
    let password = (document.getElementById("password") as HTMLInputElement).value

    this.authServive.login(email, password).subscribe((user : any)=>{
      if(user == null) {
        alert('There\'s no account with these parameters')
      } else {
        alert(user.name + ', you\' re logged in!');
      }
    })
  }

}
