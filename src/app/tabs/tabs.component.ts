import { Component, OnInit } from '@angular/core';
import { Books, BookserviceService } from '../services/bookservice.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
})
export class TabsComponent  implements OnInit {
  
  isAdmin:boolean=false;
  constructor(private bookService:BookserviceService) { }

  ngOnInit() {
    this.bookService.getProfile().then(user => {
      this.isAdmin = this.checkIfAdmin(user.email);
    });
  }

  checkIfAdmin(email: string): boolean {
    const adminEmails = ['ochoajp14@gmail.com', 'admin@123.com','walter@gmail.com'];
    return adminEmails.includes(email);
  }
}
