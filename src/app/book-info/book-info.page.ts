import { Component, Input, OnInit } from '@angular/core';
import { Books, BookserviceService } from '../services/bookservice.service';
import { ModalController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-book-info',
  templateUrl: './book-info.page.html',
  styleUrls: ['./book-info.page.scss'],
})
export class BookInfoPage implements OnInit {
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

  async updateBook(){
    this.bookService.updateBook(this.book)
    const toast = await this.toastController.create({
      message:'Book Updated!',
      duration:2000
    })
    toast.present()
    this.modalController.dismiss()
  }

  async removeBook(){
    await this.bookService.deleteBook(this.id)
    const toast = await this.toastController.create({
      message:'Book Removed!',
      duration:2000
    })
    toast.present()
    this.modalController.dismiss()
  }

  cancel(){
    this.modalController.dismiss()
  }
}
