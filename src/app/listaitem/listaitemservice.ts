import { HttpClient,HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { MessageService } from '../message.service';
import {Injectable} from '@angular/core';
import {Observable } from 'rxjs/Observable';
import {ItemLista} from './ListaItem'
import {of} from 'rxjs';
import 'rxjs/Rx'
import { catchError, retry, map, tap } from 'rxjs/operators';


import 'rxjs/add/operator/map';


@Injectable()
export class ListaItemService{

public listaItemListUrl = 'http://www.andersonjr.com.br:8081/api/v1/itemlista/listar';
public listaItemSaveUrl = 'http://www.andersonjr.com.br:8081/api/v1/itemlista/salvar'
public listaItemDeleteUrl = 'http://www.andersonjr.com.br:8081/api/v1/itemlista/excluir'
constructor(private _http: HttpClient,private messageService: MessageService) { }

httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

listaItemListar(idLista : string): Observable<ItemLista[]> {
    return this._http.get<ItemLista[]>(this.listaItemListUrl+"/"+idLista)
  }


SaveListaItem(itemLista: ItemLista): Observable<ItemLista> {
    return this._http.post<ItemLista>(this.listaItemSaveUrl, itemLista, this.httpOptions).pipe(
      tap((newListaItem: ItemLista) => this.log(`persistir id=${itemLista.id}`)),
      catchError(this.handleError<ItemLista>('addItemLista'))
    )
}

DeleteListaItem(itemLista: ItemLista): Observable<ItemLista> {
  return this._http.post<ItemLista>(this.listaItemDeleteUrl, itemLista, this.httpOptions).pipe(
    tap((newListaItem: ItemLista) => this.log(`remover id=${itemLista.id}`)),
    catchError(this.handleError<ItemLista>('removeItemLista'))
  )
}

private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.sendMessage(`HeroService: ${message}`);
  }

} 