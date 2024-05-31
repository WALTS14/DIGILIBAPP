import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalComponent } from '../modal/modal.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Books, BookserviceService } from '../services/bookservice.service';
import { BookInfo2Page } from '../book-info2/book-info2.page';
import { CartPage } from '../cart/cart.page';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  searchTerm: string = '';
  userId: any;
  bookimage: string;
  bookname: string;
  bookauthor: string;
  bookgenre: string;
  bookprice: number;
  isCart: boolean = false;
  books: Books[] = [];
  recommendedBooks: Books[] = [];
  historyBooks: Books[] = [];
  favorites: Books[] = [];

  constructor(
    private modalController: ModalController, 
    private route: ActivatedRoute,
    private router: Router, 
    private bookService: BookserviceService
  ) { }

  ngOnInit() {
    this.loadBooks();
    this.bookService.getProfile().then(user => {
      if (user) {
        this.userId = user.uid;
        this.loadFavoriteBooks();
      }
    });
  }
  
  async toggleModal() {
    const modal = await this.modalController.create({
      component: ModalComponent
    });
    return await modal.present();
  }
  
  async openBook2(book: Books) {
    const modal = await this.modalController.create({
      component: BookInfo2Page,
      componentProps: { id: book.id }
    });
    await modal.present();
  }

  async openCart() {
    const modal = await this.modalController.create({
      component: CartPage
    });
    return await modal.present();
  }
  
  loadBooks() {
    this.bookService.getBook().subscribe(res => {
      this.books = res;
      this.setRecommendedBooks();
      this.setHistoryBooks();
    });
  }

  loadFavoriteBooks() {
    if (this.userId) {
      this.bookService.getFavorites(this.userId).subscribe(favorites => {
        this.favorites = favorites;
      });
    }
  }

  isFavorite(book: Books): boolean {
    return this.favorites.some(favorite => favorite.id === book.id);
  }

  async toggleFavorite(book: Books) {
    if (this.isFavorite(book)) {
      await this.bookService.removeFromFavorites(book.id!);
    } else {
      await this.bookService.addToFavorites(book);
    }
    this.loadFavoriteBooks(); 
  }

  setRecommendedBooks() {
    this.recommendedBooks = this.books.sort(() => 0.5 - Math.random()).slice(0, 3);
  }

  setHistoryBooks() {
    const historyBooks = this.books.filter(book => book.bookgenre.toLowerCase() === 'history').slice(0, 3);
    this.historyBooks = historyBooks;
  }
}

