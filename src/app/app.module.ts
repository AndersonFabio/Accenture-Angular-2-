import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule} from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListaComponent } from './lista/lista.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { MessageService } from './message.service';
import { ItemComponent } from './item/item.component';
import { ListaitemComponent } from './listaitem/listaitem.component';


@NgModule({
  declarations: [
    AppComponent,
    ListaComponent,
    HomeComponent,
    ItemComponent,
    ListaitemComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
