import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalComponent } from '../modal/modal.component';
import { Books, iBooks } from './dashboard.model';
import { DashboardService } from './dashboard.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  BookList: iBooks[] = [];
  id: any;
  searchTerm: string ='';
  
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

  ngOnInit(): void {
   
    // this.firestore.collection('books').valueChanges().subscribe((books: any[]) => {
    //   this.Books = books;
    //   this.filterItems(this.searchTerm); // Filter items after fetching data
    // });
  }
  
  
  
  search(searchTerm: string) {
    this.searchTerm = searchTerm.toLowerCase();
  }

  

  filterItems(searchTerm: string) {
    this.filteredItems = this.Book.filter((item) =>
      item.bookName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }


  constructor(private modalController: ModalController, private dashboard: DashboardService, private route: ActivatedRoute,
    private router:Router
  ) {  }

  
  async toggleModal() {
    const modal = await this.modalController.create({
      component: ModalComponent
    });
    return await modal.present();
  }
  
  ionViewWillEnter(){
    this.book();
  }

  async book(){
    this.BookList = await this.dashboard.getBooks();
    
  }
  






  goToHome() {
    
    this.router.navigate(['/dashboard']);
  }

  goToBook() {
    
    this.router.navigate(['/book']);
  }

  goToBookmark() {
    
    this.router.navigate(['/bookmark']);
  }

  goToProfile() {
    
    this.router.navigate(['/profile']);
  }
}
