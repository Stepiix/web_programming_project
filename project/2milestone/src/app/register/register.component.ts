import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  ePattern = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
  pwPattern =/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
  nPattern = /(\+[0-9]+)|[0-9]+/;

  name: string = "";
  email: string = "";
  number: string = "";
  password: string = "";
  cpassword: string = "";

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {

  }

  registerUser(): void{
    if(this.password != this.cpassword){
      alert("Passwords do not match")
    } else {
      alert("ciao")
      this.auth.register(this.name, this.email, this.password, this.number).subscribe((user : any)=>{
        alert(typeof user)
        if (typeof user == "string")
          alert(user)
        if(user == null) {
          alert('There\'s already an account with this mail')
        } else {
          if (user && user.token) {
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.router.navigate(['allevents']);
          }
        }
      })
    }
  }

  validate() {
    this.name = (document.getElementById("username") as HTMLInputElement).value;
    this.email = (document.getElementById("email") as HTMLInputElement).value;
    this.password = (document.getElementById("password") as HTMLInputElement).value;
    this.cpassword = (document.getElementById("cpassword") as HTMLInputElement).value;
    this.number = (document.getElementById("phonenumber") as HTMLInputElement).value;


    if (this.name != "") {
      if (this.email != "") {
        if (this.password != "" && this.cpassword == this.password) {
          if (this.ePattern.test(this.email)) {
            if (this.pwPattern.test(this.password) && this.pwPattern.test(this.cpassword) && this.password.length >= 8) {
              if (this.number != "" && this.nPattern.test(this.number) && this.number.length >= 9) {
                this.registerUser();
              } else if (this.number != "") {
                alert("It's not mandatory to put it, but it must contain only numbers or the + in case you're adding the prefix");
              } else { this.registerUser(); }
            } else { alert("Password must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"); }
          } else { alert("Please insert a real email"); }
        } else { alert("Password is required and you have to confirm it in the second input!"); }
      } else { alert("Email is required!"); }
    } else { alert("Name is required!"); }    
  }
}
