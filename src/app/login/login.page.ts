import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthenticationService } from '../services/authentication.service';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  Arrayemail: String[] = ['Admin'];
  Arraypass: String[] = ['adminpass'];

  email: string = "";
  password: string = "";

  constructor(private authserv: AuthenticationService, private router: Router, private alertController: AlertController) { }

    

   async login(){

    if (this.email== this.Arrayemail[0] && this.password == this.Arraypass[0] ){
           this.router.navigate(['tabs/library'])
      }
     const auth = getAuth();
     signInWithEmailAndPassword(auth, this.email, this.password)
      .then((userCredential) => {

        const user = userCredential.user;
        this.authserv.setAuthentication(true);
        this.presentAlert('Success', 'Welcome'+user.displayName);
        this.router.navigate(['tabs/dashboard']);
      })
      .catch((error) =>{
        const errorCode = error.code;
        const errorMessage = error.message;
        this.presentAlert('Error', 'Invalid Password');
        console.error(error);
      });
  }
  



  
  ngOnInit() {
  }
  
  async presentAlert(header: string, message: string){
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }

}
