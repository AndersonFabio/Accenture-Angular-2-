import { HttpClient,HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { MessageService } from '../message.service';
import {Injectable} from '@angular/core';
import {Observable } from 'rxjs/Observable';
import {Item} from './Item'
import {of} from 'rxjs';
import 'rxjs/Rx'
import { catchError, retry, map, tap } from 'rxjs/operators';


import 'rxjs/add/operator/map';


@Injectable()
export class ItemService{
  //include appropriate API url
public itemListUrl = 'http://www.andersonjr.com.br:8081/api/v1/item/listar';
public itemSaveUrl = 'http://www.andersonjr.com.br:8081/api/v1/item/salvar'
public itemDeleteUrl = 'http://www.andersonjr.com.br:8081/api/v1/item/excluir'
constructor(private _http: HttpClient,private messageService: MessageService) { }

httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

itemListar(): Observable<Item[]> {
    return this._http.get<Item[]>(this.itemListUrl)
  }


SaveItem(item: Item): Observable<Item> {
    return this._http.post<Item>(this.itemSaveUrl, item, this.httpOptions).pipe(
      tap((newItem: Item) => this.log(`persistir id=${item.id}`)),
      catchError(this.handleError<Item>('addItem'))
    )
}

DeleteItem(item: Item): Observable<Item> {
  return this._http.post<Item>(this.itemDeleteUrl, item, this.httpOptions).pipe(
    tap((newListarTarefa: Item) => this.log(`remover id=${item.id}`)),
    catchError(this.handleError<Item>('removeItem'))
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