import { Injectable } from '@angular/core';
import { User } from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Firestore, collection, addDoc, query, where, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export class Books{
  id?:string;
  userId:string;
  bookimage:string;
  bookname:string;
  bookauthor:string;
  bookgenre:string;
  isFavorite:boolean;
  isCart:boolean;

  constructor(userId:string,bookimage:string,
    bookname:string,
    bookauthor:string,
    bookgenre:string,
    isFavorite:boolean,
    isCart:boolean,){
      this.userId = userId;
      this.bookimage = bookimage
      this.bookname = bookname;
      this.bookauthor = bookauthor;
      this.bookgenre = bookgenre;
      this.isFavorite = isFavorite;
      this.isCart = isCart;
  } 
}

@Injectable({
  providedIn: 'root'
})
export class BookserviceService {
  
  userId:any


  constructor(public ngFireAuth : AngularFireAuth, private firestore: Firestore) { 
    this.getProfile().then(user =>{
      this.userId = user.uid
      console.log(this.userId)
    })
  }
  
    async getProfile(){
      return new Promise<User | null>((resolve,reject)=>{
        this.ngFireAuth.onAuthStateChanged(user => {
          if(user){
            resolve(user)
          }else{
            resolve(null)
          }
      }, reject)
    })
  }

  addBook(book:Books){
    book.userId = this.userId;
    const addRef = collection(this.firestore, "Library")
    return addDoc(addRef,book)
  }

  getBook(userId:any) : Observable<Books[]>{
    const getRef = collection(this.firestore, `Library`)
    const refQuery = query(getRef,where(`userId`,`==`,userId))
    return collectionData(refQuery,{idField:`id`}) as Observable <Books[]>
  }
}  
