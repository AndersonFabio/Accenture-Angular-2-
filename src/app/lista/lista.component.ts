import { Component, OnInit } from '@angular/core';
import {ListaTarefa} from './ListaTarefa';
import {ListaTarefaService} from './listaservice';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista',
  providers : [ListaTarefaService],
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {
  title = 'Lista';
	listaTarefas: ListaTarefa[];
	listaTarefa : ListaTarefa;

	constructor(private _listaTarefaService : ListaTarefaService, private router: Router){
    this.listaTarefas = [];
	this.listaTarefa = new ListaTarefa;

	}
	
	ngOnInit() : void{
	this.ListaTarefaLista();
 	}

	 ListaTarefaLista() {
		this._listaTarefaService.listaTarefaListar().subscribe(listaTarefas => this.listaTarefas = listaTarefas);
		}

	adicionarItem(listatarefa : ListaTarefa) {
		sessionStorage.setItem("listatarefa", JSON.stringify(listatarefa));
		this.router.navigate(['/listaitem']);
	}
	 add(listaTarefa : ListaTarefa): void {
		this._listaTarefaService.SaveListaTarefa(listaTarefa)
		  .subscribe(listaTarefa => {
			this.listaTarefa.descricao = "";
			this.ListaTarefaLista();
		  });
		 
	}

	 remove(listaTarefa : ListaTarefa): void {
		this._listaTarefaService.DeleteListaTarefa(listaTarefa)
		  .subscribe(listaTarefa => {
			this.ListaTarefaLista();
		  });
		 
	}


}