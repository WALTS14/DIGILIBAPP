import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {


  constructor(private router: Router) { }
  
  setAuthentication(auth:boolean){
    if (auth) {
      localStorage.setItem("loggIn", "True");
    }
  }

  canActiviate(){
    if(localStorage.getItem("loggedIn")=="true"){
      return true;
    }
    this.router.navigate(['login']);
    return false;
  }
}
