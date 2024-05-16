import { Injectable } from '@angular/core';
import { addDoc, collection,getFirestore, updateDoc, doc, deleteDoc, getDocs } from "firebase/firestore";
import { initializeApp } from 'firebase/app';
import { environment } from 'src/environments/environment';

import { AlertController } from '@ionic/angular';
import { Books, iBooks } from './dashboard.model';


@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  newList: iBooks[] = []; 
  books: Books = new Books();
  isloading: boolean = false;
  constructor(private alertC: AlertController) { }

  async getBooks():Promise<iBooks[]>{
    const app = initializeApp(environment.firebaseConfig);
    const firestore = getFirestore(app);

    const books: Books[] = [];

    const querySnapshot = await getDocs(collection(firestore, "books"));
    querySnapshot.forEach((doc) => {
      const book=doc.data() as Books;
      book.id = doc.id;
      books.push(book);
     
    });
    return books;
  }
  async tryAdd(book: Books) {
    const app = initializeApp(environment.firebaseConfig);
    const firestore = getFirestore(app);

    try{
      const docRefM1 = await addDoc(collection(firestore, "books"), {
        
        bookName: book.bookName,
        bookAuthor: book.bookAuthor,
        bookGenre: book.bookGenre
        

      });
      console.log("Doc written with ID:", docRefM1);
    }catch (e){
      console.error("error adding document:", e);
    }
  }

async tryUpdate(book:Books) {
  const app = initializeApp(environment.firebaseConfig);
  const firestore = getFirestore(app);

  try{
    const docRef = doc(firestore, "books", book.id);
    await updateDoc(docRef, {
        bookName: book.bookName,
        bookAuthor: book.bookAuthor,
        bookGenre: book.bookGenre});
  }catch (e){
    console.error("error adding document:", e);
  }
  
}
async tryDelete(book:Books){
  const app = initializeApp(environment.firebaseConfig);
  const firestore = getFirestore(app);

  try{
    const docRef = doc(firestore, "books", book.id);
    await deleteDoc(docRef);
  }catch(e){
    console.error("error adding document:", e);
  }
}
async presentAlert(header: string,message: string){
const alert =await this.alertC.create({
  header: header,
  message: message,
  buttons: ['OK']
});
await alert.present();
}

  edit(book: iBooks){
this.books = book;
  }
}

