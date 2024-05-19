import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BookInfo2PageRoutingModule } from './book-info2-routing.module';

import { BookInfo2Page } from './book-info2.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BookInfo2PageRoutingModule
  ],
  declarations: [BookInfo2Page]
})
export class BookInfo2PageModule {}
