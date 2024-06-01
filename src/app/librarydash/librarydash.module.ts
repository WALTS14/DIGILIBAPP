import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LibrarydashPageRoutingModule } from './librarydash-routing.module';

import { LibrarydashPage } from './librarydash.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LibrarydashPageRoutingModule
  ],
  declarations: [LibrarydashPage]
})
export class LibrarydashPageModule {}
