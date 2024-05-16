// settings.page.ts

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  constructor(private router: Router) { }

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

  signOut() {
    
  }

  goToHome() {
    
    this.router.navigate(['/home']);
  }

  goToBook() {
    
    this.router.navigate(['/book']);
  }

  goToBookmark() {
    
    this.router.navigate(['/bookmark']);
  }

  goToProfile() {
    
    this.router.navigate(['/profile']);
  }
}

