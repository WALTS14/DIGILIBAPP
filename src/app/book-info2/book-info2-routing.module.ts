import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BookInfo2Page } from './book-info2.page';

const routes: Routes = [
  {
    path: '',
    component: BookInfo2Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookInfo2PageRoutingModule {}
