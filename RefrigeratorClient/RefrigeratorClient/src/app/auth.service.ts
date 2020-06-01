import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})


export class AuthService {

   // authentication service controller
   baseUrl: string = 'https://localhost:44317/auth/'

  constructor(private http:HttpClient, private router:Router) { }

  registre(user){
    return this.http.post(this.baseUrl + 'registre', user);
  }

  login(user){
    return this.http.post(this.baseUrl + 'login', user);
  }
  // get username
  get getUsername(){
    return localStorage.getItem('username');
  }
  // get token
  get isAuthenticated(){
    return !!localStorage.getItem('token');
  }

  logout(){
    localStorage.removeItem('username');
    localStorage.removeItem('token');
    // redirect back to home
    this.router.navigate(['']);
  }  
  
}
