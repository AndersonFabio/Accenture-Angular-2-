import { HttpClient,HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { MessageService } from '../message.service';
import {Injectable} from '@angular/core';
import {Observable } from 'rxjs/Observable';
import {ListaTarefa} from './ListaTarefa'
import {of} from 'rxjs';
import 'rxjs/Rx'
import { catchError, retry, map, tap } from 'rxjs/operators';


import 'rxjs/add/operator/map';


@Injectable()
export class ListaTarefaService{

public listaTarefaListUrl = 'http://www.andersonjr.com.br:8081/api/v1/listatarefa/listar';
public listaTarefaSaveUrl = 'http://www.andersonjr.com.br:8081/api/v1/listatarefa/salvar'
public listaTarefaDeleteUrl = 'http://www.andersonjr.com.br:8081/api/v1/listatarefa/excluir'
constructor(private _http: HttpClient,private messageService: MessageService) { }

httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

listaTarefaListar(): Observable<ListaTarefa[]> {
    return this._http.get<ListaTarefa[]>(this.listaTarefaListUrl)
  }


SaveListaTarefa(listarTarefa: ListaTarefa): Observable<ListaTarefa> {
    return this._http.post<ListaTarefa>(this.listaTarefaSaveUrl, listarTarefa, this.httpOptions).pipe(
      tap((newListarTarefa: ListaTarefa) => this.log(`persistir id=${listarTarefa.id}`)),
      catchError(this.handleError<ListaTarefa>('addListaTarefa'))
    )
}

DeleteListaTarefa(listarTarefa: ListaTarefa): Observable<ListaTarefa> {
  return this._http.post<ListaTarefa>(this.listaTarefaDeleteUrl, listarTarefa, this.httpOptions).pipe(
    tap((newListarTarefa: ListaTarefa) => this.log(`remover id=${listarTarefa.id}`)),
    catchError(this.handleError<ListaTarefa>('addListaTarefa'))
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