import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { Books, BookserviceService } from '../services/bookservice.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  cart: Books[] = [];
  totalPrice: number = 0;

  constructor(
    private bookService: BookserviceService,
    private modalController: ModalController,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    this.loadCart();
  }

  loadCart() {
    this.cart = this.bookService.getCart();
    this.calculateTotalPrice();
  }

  increaseQuantity(book: Books) {
    this.bookService.updateCartItem(book, book.quantity + 1);
    this.loadCart();
  }

  decreaseQuantity(book: Books) {
    if (book.quantity > 1) {
      this.bookService.updateCartItem(book, book.quantity - 1);
      this.loadCart();
    }
  }

  updateQuantity(book: Books, quantity: number) {
    this.bookService.updateCartItem(book, quantity);
    this.loadCart();
  }

  calculateTotalPrice() {
    this.totalPrice = this.bookService.getTotalPrice();
  }

  closeCart() {
    this.modalController.dismiss();
  }

  async checkout() {
    await this.bookService.checkout();
    const toast = await this.toastController.create({
      message: 'Checkout successful!',
      duration: 2000
    });
    toast.present();
    this.modalController.dismiss();
  }
}
