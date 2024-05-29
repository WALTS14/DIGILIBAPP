import { Component, OnInit } from '@angular/core';
import { BookserviceService } from '../services/bookservice.service';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnInit {
  orders: any[] = [];

  constructor(private bookService: BookserviceService,
     private navCtrl:NavController,
    private router:Router) { }

  ngOnInit() {
    this.bookService.getAllOrders().subscribe((res) => {
      this.orders = res.map(order => ({
        ...order,
        date: order.date ? (order.date as any).toDate() : null 
      }));
    });
  }
  goBack() {
    this.router.navigate(['/library']);
  }
}

