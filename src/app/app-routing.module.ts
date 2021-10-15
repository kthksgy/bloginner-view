import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListPageComponent } from './components/list-page/list-page.component';
import { DetailPageComponent } from './components/detail-page/detail-page.component';

const routes: Routes = [
  { path: '', component: ListPageComponent },
  { path: ':id', component: DetailPageComponent }
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes, { useHash: true })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
