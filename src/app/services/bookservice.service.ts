import { Injectable } from '@angular/core';
import { User } from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Firestore, collection, addDoc, query, where, collectionData, updateDoc, deleteDoc, doc, docData, getDocs } from '@angular/fire/firestore';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { switchMap } from 'rxjs/operators'
import { ToastController } from '@ionic/angular';


export class Books{
  id?:string;
  userId:string;
  bookimage:string;
  bookname:string;
  bookauthor:string;
  bookgenre:string;
  bookprice:number;
  quantity:number;
  sypnosis:string;
  isCart:boolean;

  constructor(userId:string,bookimage:string,
    bookname:string,
    bookauthor:string,
    bookgenre:string,
    bookprice:number,
    quantity:number,
    sypnosis:string,
    isCart:boolean,){
      this.userId = userId;
      this.bookimage = bookimage
      this.bookname = bookname;
      this.bookauthor = bookauthor;
      this.bookgenre = bookgenre;
      this.bookprice = bookprice;
      this.quantity = quantity;
      this.sypnosis = sypnosis;
      this.isCart = isCart;
  } 
}

@Injectable({
  providedIn: 'root'
})
export class BookserviceService {
  
  userId:any
  private cart: Books[] = [];
  private favorites: Books[] = [];
  private favoritesSubject = new BehaviorSubject<Books[]>([]);
  favorites$ = this.favoritesSubject.asObservable();

  constructor(public ngFireAuth : AngularFireAuth, private firestore: Firestore,
    private toastController:ToastController
  ) { 
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

  signOut() {
    return this.ngFireAuth.signOut().then(() => {
      window.location.reload();
    });
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
      bookgenre:book.bookgenre,bookprice:book.bookprice, bookimage:book.bookimage, sypnosis:book.sypnosis,
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

  async checkout() {
    if (!this.userId) {
      await this.getProfile();
    }

    const order = {
      userId: this.userId,
      items: this.cart,
      totalPrice: this.getTotalPrice(),
      date: new Date()
    };

    const orderRef = collection(this.firestore, 'Orders');
    await addDoc(orderRef, order);
    this.cart = [];
  }

  getOrders(userId: string): Observable<any[]> {
    const ordersRef = collection(this.firestore, 'Orders');
    const q = query(ordersRef, where('userId', '==', userId));
    return collectionData(q, { idField: 'id' }) as Observable<any[]>;
  }

  getAllOrders(): Observable<any[]> {
    const ordersRef = collection(this.firestore, 'Orders');
    return collectionData(ordersRef, { idField: 'id' }) as Observable<any[]>;
  }

  async addToFavorites(book: Books) {
    const favoritesRef = collection(this.firestore, 'Favorites');
    const querySnapshot = await getDocs(query(favoritesRef, where('userId', '==', this.userId), where('id', '==', book.id)));
    if (querySnapshot.empty) {
      await addDoc(favoritesRef, { ...book, userId: this.userId });
      this.loadFavorites(this.userId);
      this.showToast('Added to favorites!');
    } else {
      this.showToast('Book already in favorites!');
    }
  }

  async removeFromFavorites(bookId: string) {
    const favoritesRef = collection(this.firestore, 'Favorites');
    const q = query(favoritesRef, where('userId', '==', this.userId), where('id', '==', bookId));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      querySnapshot.forEach(async docSnapshot => {
        await deleteDoc(docSnapshot.ref);
      });
      this.loadFavorites(this.userId);
      this.showToast('Removed from favorites!');
    }
  }

  getFavorites(userId: string): Observable<Books[]> {
    const favoritesRef = collection(this.firestore, 'Favorites');
    const q = query(favoritesRef, where('userId', '==', userId));
    return collectionData(q, { idField: 'id' }) as Observable<Books[]>;
  }

  private loadFavorites(userId: string) {
    this.getFavorites(userId).subscribe(favorites => {
      this.favorites = favorites;
      this.favoritesSubject.next(favorites);
    });
  }

  private async showToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'top'
    });
    toast.present();
  }
} 
