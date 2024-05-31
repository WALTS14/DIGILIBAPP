import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs/operators';
import { Books, BookserviceService } from '../services/bookservice.service';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { BookInfoPage } from '../book-info/book-info.page';
import { BookInfo2Page } from '../book-info2/book-info2.page';

@Component({
  selector: 'app-library',
  templateUrl: './library.page.html',
  styleUrls: ['./library.page.scss'],
})
export class LibraryPage implements OnInit {
  userId: any;
  bookimage: string;
  bookname: string;
  bookauthor: string;
  bookgenre: string;
  bookprice: number;
  quantity: number = 0;
  sypnosis: string;
  isCart: boolean = false;
  isAdmin: boolean = false;

  books: Books[] = [];

  constructor(
    private bookService: BookserviceService,
    private toastController: ToastController,
    private alertController: AlertController,
    private modalController: ModalController,
    private router: Router,
    private afStorage: AngularFireStorage
  ) {}

  ngOnInit() {
    this.bookService.getProfile().then(user => {
      this.userId = user.uid;
      this.isAdmin = this.checkIfAdmin(user.email);
      this.bookService.getBook().subscribe(res => {
        this.books = res;
      });
    });
  }

  checkIfAdmin(email: string): boolean {
    const adminEmails = ['ochoajp14@gmail.com', 'admin@123.com','walter@gmail.com'];
    return adminEmails.includes(email);
  }

  cancel() {
    this.modalController.dismiss(null, 'cancel');
  }

  confirm() {
    this.modalController.dismiss(this.bookname, 'confirm');
    this.addBook();
  }

  clearFields() {
    this.bookname = "";
    this.bookimage = "";
    this.isCart = false;
    this.bookauthor = "";
    this.bookgenre = "";
    this.bookprice = null;
    this.sypnosis ="";
  }

  addBook() {
    this.bookService.addBook({
      userId: this.userId,
      bookname: this.bookname,
      bookimage: this.bookimage,
      isCart: this.isCart,
      bookauthor: this.bookauthor,
      bookgenre: this.bookgenre,
      bookprice: this.bookprice,
      sypnosis: this.sypnosis,
      quantity: this.quantity
    }).then(async () => {
      const toast = await this.toastController.create({
        message: "Book Added successfully!",
        duration: 2000
      });
      toast.present();
      this.clearFields();
    }).catch(async (error) => {
      const alert = await this.alertController.create({
        header: "ERROR!",
        subHeader: "Ooops something went wrong",
        buttons: ['okay']
      });
      alert.present();
    });
  }

  async openBook(book: Books) {
    const modal = await this.modalController.create({
      component: BookInfoPage,
      componentProps: { id: book.id }
    });
    await modal.present();
  }

  async openBook2(book:Books){
    const modal = await this.modalController.create({
      component:BookInfo2Page,
      componentProps:{id:book.id}
    })
    await modal.present()
  }

  goToOrdersPage() {
    this.router.navigate(['/orders']);
  }

  uploadFile(event: any) {
    const file = event.target.files[0];
    const filePath = `images/${new Date().getTime()}_${file.name}`;
    const fileRef = this.afStorage.ref(filePath);
    const task = this.afStorage.upload(filePath, file);

    task.snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe(url => {
          this.bookimage = url;
        });
      })
    ).subscribe();
  }
}

