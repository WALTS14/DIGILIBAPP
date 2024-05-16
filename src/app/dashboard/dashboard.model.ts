


export class Books{
    id:string;
    bookName: string;
    bookAuthor: string;
    bookGenre: string;
    bookPrice: number;
    // bookImage: ref;
constructor (id: string = '', bookName: string = '', bookAuthor: string = '', bookGenre: string = '', bookPrice: number= 0){
   this.id = id;
   this.bookName = bookName;
   this.bookAuthor = bookAuthor;
   this.bookGenre = bookGenre;
   this.bookPrice = bookPrice;
//    this.bookImage = bookImage;
}

}


export interface iBooks{
    id:string;
    bookName: string;
    bookAuthor: string;
    bookGenre: string;
    bookPrice: number;
    // bookImage: reference;
}
