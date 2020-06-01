import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginData = {
    username:'',
    password:''
  } 

  constructor(private service:AuthService, private router:Router) { 

  }

  login(){   
    // subscribe data from service
    this.service.login(this.loginData).subscribe((data:any) => {      
      // store token and username locally
      localStorage.setItem('username', data.Username);
      localStorage.setItem('token', data.Token);

      this.router.navigate(['/entries']);
    },
    // error handling
    (err) => alert(err.error.Message));
  };
  

}
