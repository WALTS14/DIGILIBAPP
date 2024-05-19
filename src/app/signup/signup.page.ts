import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthenticationService } from '../services/authentication.service';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  email: string ='';
  password: string ='';
  repeatpass: string ='';
  
  constructor(private alertController: AlertController, private router: Router) { }

  ngOnInit() {
  }
  
  async signup(){
    if (!this.email || !this.password || !this.repeatpass){
      this.presentAlert('Error', 'Please fill in all fields.');
      return;
    }

    if (this.password !== this.repeatpass){
      this.presentAlert('Error', 'Password do not match.');
      return;
    }
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, this.email, this.password)
      .then((userCredential) => {
        console.log(userCredential);
        const user = userCredential.user;
        this.presentAlert('Success', 'Sign up Successfully');
        this.router.navigate(['login']);

    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(error);
    });
    
    this.email ='';
    this.password = '';
    this.repeatpass = '';
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
