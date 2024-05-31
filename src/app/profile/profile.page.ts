import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
    private router: Router,
    private bookService: BookserviceService
  ) {}

  ngOnInit() {
    this.bookService.getProfile().then((user) => {
      this.userId = user?.uid;
      if (this.userId) {
        this.loadFavorites();
        this.loadOrders();
      }
    });
  }
  removeFromFavorites(bookId: string) {
    this.bookService.removeFromFavorites(bookId).then(() => {
      this.loadFavorites();
    }).catch(error => {
      console.error('Error removing book from favorites:', error);
    });
  }

  loadFavorites() {
    this.bookService.getFavorites(this.userId).subscribe(favorites => {
      this.favorites = favorites;
    });
  }

  loadOrders() {
    this.bookService.getOrders(this.userId).subscribe((res) => {
      this.orders = res.map(order => ({
        ...order,
        date: (order.date as any).toDate() 
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


