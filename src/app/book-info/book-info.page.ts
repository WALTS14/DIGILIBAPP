import { Component, Input, OnInit } from '@angular/core';
import { Books, BookserviceService } from '../services/bookservice.service';
import { ModalController, ToastController } from '@ionic/angular';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-book-info',
  templateUrl: './book-info.page.html',
  styleUrls: ['./book-info.page.scss'],
})
export class BookInfoPage implements OnInit {
  @Input() id:string;
  book : Books
  newImage: File | null = null;

  constructor( private bookService: BookserviceService,
      private toastController:ToastController,
      private modalController:ModalController,
      private afStorage : AngularFireStorage) { 
    
  }

  ngOnInit() {
    console.log(this.id)
    this.bookService.getBookById(this.id).subscribe(res =>{
      this.book = res
    })
  }
  uploadFile(event: any) {
    this.newImage = event.target.files[0];
  }

  async updateBook() {
    if (this.newImage) {
      const filePath = `images/${new Date().getTime()}_${this.newImage.name}`;
      const fileRef = this.afStorage.ref(filePath);
      const task = this.afStorage.upload(filePath, this.newImage);

      task.snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe(async url => {
            this.book.bookimage = url;
            await this.bookService.updateBook(this.book);
            this.showToast('Book Updated!');
            this.modalController.dismiss();
          });
        })
      ).subscribe();
    } else {
      await this.bookService.updateBook(this.book);
      this.showToast('Book Updated!');
      this.modalController.dismiss();
    }
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

  private async showToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000
    });
    toast.present();
  }
}
