import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage {
  selectedTab: string = 'reading'; 

  constructor(private navCtrl: NavController, private router:Router) {}

  goToSettingsPage() {
    this.router.navigate(['/settings']);
  }

  showReadingList() {
    this.selectedTab = 'reading';
  }

  showFavorites() {
    this.selectedTab = 'favorites';
  }

  showDownloads() {
    this.selectedTab = 'downloads';
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
