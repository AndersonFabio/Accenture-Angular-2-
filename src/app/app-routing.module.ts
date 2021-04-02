import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {  ListaComponent } from './lista/lista.component'
import { ItemComponent} from './item/item.component'
import { AppComponent } from './app.component'
import { HomeComponent } from './home/home.component';
import { ListaitemComponent } from './listaitem/listaitem.component';


const routes: Routes = [
  { path: 'lista', component: ListaComponent },
  { path: 'item', component: ItemComponent},
  { path: 'listaitem', component: ListaitemComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
