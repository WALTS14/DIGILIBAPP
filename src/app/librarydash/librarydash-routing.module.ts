import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LibrarydashPage } from './librarydash.page';

const routes: Routes = [
  {
    path: '',
    component: LibrarydashPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LibrarydashPageRoutingModule {}
