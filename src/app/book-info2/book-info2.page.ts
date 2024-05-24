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
  
  book : Books
  constructor( private bookService: BookserviceService,
      private toastController:ToastController,
      private modalController:ModalController) { 
    
  }

  ngOnInit() {
    console.log(this.id)
    this.bookService.getBookById(this.id).subscribe(res =>{
      this.book = res
    })
  }

  async updateBook() {
    this.bookService.updateBook(this.book);
  
    const toast = await this.toastController.create({
      message: 'Changes Have been Made!',
      duration: 2000
    });
    toast.present();
    
    if (this.book.isCart) {
      const favoriteToast = await this.toastController.create({
        message: 'This book Has been Added To cart!',
        duration: 4000
      });
      favoriteToast.present();
    }

    if (this.book.isFavorite) {
      const favoriteToast = await this.toastController.create({
        message: 'This book is marked as favorite!',
        duration: 2000
      });
      favoriteToast.present();
    }

  
    this.modalController.dismiss();
  }

  async addToCart() {
    this.bookService.addToCart(this.book);
    const toast = await this.toastController.create({
      message: 'Book Added to Cart!',
      duration: 2000
    });
    toast.present();

  }

  cancel(){
    this.modalController.dismiss()
  }

  
}
