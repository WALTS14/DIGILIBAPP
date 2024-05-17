import { Component, OnInit } from '@angular/core';
import { Books, BookserviceService } from '../services/bookservice.service';

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
isFavorite:boolean;
isCart:boolean;

books:Books[]=[]

  constructor(private bookService:BookserviceService) { }

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

}
