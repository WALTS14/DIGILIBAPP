import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-help-and-support',
  templateUrl: './help-and-support.page.html',
  styleUrls: ['./help-and-support.page.scss'],
})
export class HelpAndSupportPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  goBack() {
    this.router.navigate(['tabs/profile']);
  }

}
