import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Books, BookserviceService } from '../services/bookservice.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  selectedTab: string = 'favorites';
  userId: any;
  favorites: Books[] = [];
  orders: any[] = [];

  constructor(
    private navCtrl: NavController,
    private router: Router,
    private bookService: BookserviceService
  ) {}

  ngOnInit() {
    this.bookService.getProfile().then((user) => {
      this.userId = user?.uid;
      if (this.userId) {
        
        this.loadOrders();
      }
    });
  }


  loadOrders() {
    this.bookService.getOrders(this.userId).subscribe((res) => {
      this.orders = res.map(order => ({
        ...order,
        date: (order.date as any).toDate() // Convert Firestore timestamp to Date
      }));
    });
  }


  goToSettingsPage() {
    this.router.navigate(['/settings']);
  }

  showReadingList() {
    this.selectedTab = 'reading';
  }

  showFavorites() {
    this.selectedTab = 'favorites';
  }

  showOrders() {
    this.selectedTab = 'orders';
  }
}

