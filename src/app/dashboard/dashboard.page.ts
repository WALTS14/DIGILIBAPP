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

  searchTerm: string ='';
  
  userId:any
bookimage:string;
bookname:string;
bookauthor:string;
bookgenre:string;
bookprice:number;
isFavorite:boolean =false;
isCart:boolean = false;

  books:Books[]=[]

  filteredItems: Array<{
    bookName: string;
    bookAuthor:string;
    bookGenre:string;
  }> = [];

  Book: Array<{
    bookName: string;
    bookAuthor:string;
    bookGenre:string;
  }>=[];

 
  
  
  search(searchTerm: string) {
    this.searchTerm = searchTerm.toLowerCase();
  }

  

  filterItems(searchTerm: string) {
    this.filteredItems = this.Book.filter((item) =>
      item.bookName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }


  constructor(private modalController: ModalController, private route: ActivatedRoute,
    private router:Router, private bookService:BookserviceService
  ) {  }

  ngOnInit() {
    this.bookService.getProfile().then(user => {
      this.userId = user.uid;
      console.log(this.userId);
      this.bookService.getBook().subscribe(res => {
        this.books = res;
        console.log(this.books);
      });
    });
  }
  
  async toggleModal() {
    const modal = await this.modalController.create({
      component: ModalComponent
    });
    return await modal.present();
  }
  
  async openBook(book:Books){
    const modal = await this.modalController.create({
      component:BookInfo2Page,
      componentProps:{id:book.id}
    })
    await modal.present()
  }

  async openCart() {
    const modal = await this.modalController.create({
      component: CartPage
    });
    return await modal.present();
  }
  
}
