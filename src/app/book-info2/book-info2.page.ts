import { Component, Input, OnInit} from '@angular/core';
import { Books, BookserviceService } from '../services/bookservice.service';
import { ModalController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-book-info2',
  templateUrl: './book-info2.page.html',
  styleUrls: ['./book-info2.page.scss'],
})
export class BookInfo2Page implements OnInit {
  @Input() id:string;
  
  book : Books;
  isFavorite: boolean;

  constructor(private bookService: BookserviceService,
              private toastController: ToastController,
              private modalController: ModalController) { }
    
  ngOnInit() {
    console.log(this.id);
    this.bookService.getBookById(this.id).subscribe(res =>{
      this.book = res;
      this.isFavorite = this.book.isFavorite;
    });
  }

  async addToCart() {
    this.bookService.addToCart(this.book);
    const toast = await this.toastController.create({
      message: 'Book Added to Cart!',
      duration: 2000
    });
    toast.present();
  }

  async updateBook() {
    this.bookService.updateBook(this.book);
  
    const toast = await this.toastController.create({
      message: 'Changes Have been Made!',
      duration: 2000
    });
    toast.present();

    if (this.isFavorite !== this.book.isFavorite) {
      if (this.book.isFavorite) {
        const favoriteToast = await this.toastController.create({
          message: 'This book has been added to favorites!',
          duration: 2000
        });
        favoriteToast.present();
      } else {
        const unfavoriteToast = await this.toastController.create({
          message: 'This book has been removed from favorites!',
          duration: 2000
        });
        unfavoriteToast.present();
      }
      this.isFavorite = this.book.isFavorite;
    }

    this.modalController.dismiss();
  }

  cancel(){
    this.modalController.dismiss();
  }

  toggleFavorite() {
    this.book.isFavorite = !this.book.isFavorite;
  }
}

