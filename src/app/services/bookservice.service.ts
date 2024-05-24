import { Injectable } from '@angular/core';
import { User } from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Firestore, collection, addDoc, query, where, collectionData, updateDoc, deleteDoc, doc, docData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';


export class Books{
  id?:string;
  userId:string;
  bookimage:string;
  bookname:string;
  bookauthor:string;
  bookgenre:string;
  bookprice:number;
  quantity:number;
  isFavorite:boolean;
  isCart:boolean;

  constructor(userId:string,bookimage:string,
    bookname:string,
    bookauthor:string,
    bookgenre:string,
    bookprice:number,
    quantity:number,
    isFavorite:boolean,
    isCart:boolean,){
      this.userId = userId;
      this.bookimage = bookimage
      this.bookname = bookname;
      this.bookauthor = bookauthor;
      this.bookgenre = bookgenre;
      this.bookprice = bookprice;
      this.quantity = quantity;
      this.isFavorite = isFavorite;
      this.isCart = isCart;
  } 
}

@Injectable({
  providedIn: 'root'
})
export class BookserviceService {
  
  userId:any
  private cart: Books[] = [];

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

  getBook(): Observable<Books[]> {
    const getRef = collection(this.firestore, `Library`);
    return collectionData(getRef, { idField: `id` }) as Observable<Books[]>;
  }

  getBookById(id:any) : Observable<Books> {
    const getIDRef = doc(this.firestore, `Library/${id}`)
    return docData(getIDRef , {idField:'id'}) as Observable <Books>
  }

  updateBook(book:Books){
    const updateRef = doc(this.firestore,`Library/${book.id}`)
    return updateDoc(updateRef, {bookname:book.bookname, bookauthor:book.bookauthor, 
      bookgenre:book.bookgenre,bookprice:book.bookprice, bookimage:book.bookimage,isFavorite:book.isFavorite,
    isCart:book.isCart })
  }

  deleteBook(id:any){
    const deleteRef = doc(this.firestore,`Library/${id}`)
    return deleteDoc(deleteRef)
  }

  addToCart(book: Books) {
    const index = this.cart.findIndex(b => b.id === book.id);
    if (index === -1) {
      this.cart.push({ ...book, quantity: 1 });
    } else {
      this.cart[index].quantity += 1;
    }
  }

  getCart() {
    return this.cart;
  }

  updateCartItem(book: Books, quantity: number) {
    const index = this.cart.findIndex(b => b.id === book.id);
    if (index !== -1) {
      this.cart[index].quantity = quantity;
      if (quantity === 0) {
        this.cart.splice(index, 1);
      }
    }
  }

  getTotalPrice() {
    return this.cart.reduce((total, book) => total + book.bookprice * book.quantity, 0);
  }
} 
