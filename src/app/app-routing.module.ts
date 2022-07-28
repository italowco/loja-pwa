import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './products/products.component';

const routes: Routes = [{
  path: '',
  children: [{
    path: 'products',
    loadChildren: () => import('./products/products.module').then(m => m.ProductsModule)
}]}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
