
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  constructor(private router: Router, private navCtrl:NavController,
    private authService: AuthService
  ) { }

  ngOnInit() {
  }

  goToAccountSettings() {
    
    this.router.navigate(['/account-settings']);
  }

  goToHelpAndSupport() {
    
    this.router.navigate(['/help-and-support']);
  }

  goToAbout() {
    
    this.router.navigate(['/about']);
  }

  async Logout() {
    try {
      await this.authService.LogOut();
      this.router.navigate(['/login']).then(() => {
        window.location.reload();
      });
    } catch (error) {
      console.error('Error during logout:', error);
    }
  }

  goBack() {
    this.router.navigate(['tabs/profile']);
  }
}

