import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../services/auth/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private auth: AuthServiceService, private router: Router) { }

  ngOnInit() {

  }

  registerUser(event: { preventDefault: () => void; target: any; }) {
    event.preventDefault() 
    const errors = []
    const target = event.target
    const username = target.querySelector('#username').value
    const password = target.querySelector('#password').value
    const cpassword = target.querySelector('#cpassword').value

    if(password != cpassword){
      errors.push("Passwords do not match")
    }

    if(errors.length === 0) {
      this.auth.registerUser(username, password).subscribe(data => {
        console.log(data)
        if(data.success) {
          this.router.navigate(['dashboard']);
        }
      })
    }

    console.log(username, password)
  }
}
