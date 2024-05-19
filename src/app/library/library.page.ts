import { Component, OnInit } from '@angular/core';
import { Books, BookserviceService } from '../services/bookservice.service';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { BookInfoPage } from '../book-info/book-info.page';

@Component({
  selector: 'app-library',
  templateUrl: './library.page.html',
  styleUrls: ['./library.page.scss'],
})
export class LibraryPage implements OnInit {
userId:any
bookimage:string;
bookname:string;
bookauthor:string;
bookgenre:string;
bookprice:number;
isFavorite:boolean =false;
isCart:boolean = false;

books:Books[]=[]

  constructor(private bookService:BookserviceService,
    private toastController:ToastController,
    private alertController:AlertController,
    private modalController:ModalController,
    private router:Router
  ) { }

  ngOnInit() {
    this.bookService.getProfile().then(user=>{
      this.userId = user.uid
      console.log(this.userId)
      this.bookService.getBook(this.userId).subscribe(res =>{
        this.books = res
        console.log(this.books)
      })
    })
  }

  cancel() {
    this.modalController.dismiss(null, 'cancel');
  }

  confirm() {
    this.modalController.dismiss(this.bookname, 'confirm');
    this.addBook()
  }

  clearFields() {
    this.bookname = "";
    this.bookimage = "";
    this.isFavorite = false;
    this.isCart = false;
    this.bookauthor = "";
    this.bookgenre = "";
    this.bookprice = null;
  }

  addBook(){
    this.bookService.addBook({userId:"",bookname:this.bookname,bookimage:this.bookimage,isFavorite:this.isFavorite,isCart:this.isCart,bookauthor:this.bookauthor,bookgenre:this.bookgenre,bookprice:this.bookprice})
    .then(async ()=>{
      const toast = await this.toastController.create({
        message:"Book Added successfully!",
        duration:2000
      })
      toast.present()
      this.clearFields();
    }).catch(async (error)=>{
      const alert = await this.alertController.create({
        header: "ERROR!",
        subHeader: "Ooops something went wrong",
        buttons: ['okay']
      })
      alert.present()
    })
  }

  async openBook(book:Books){
    const modal = await this.modalController.create({
      component:BookInfoPage,
      componentProps:{id:book.id}
    })
    await modal.present()
  }
}
