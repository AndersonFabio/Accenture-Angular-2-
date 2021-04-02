import { Component, OnInit } from '@angular/core';
import {ListaTarefa,ItemLista,Item } from './ListaItem';
import {ListaItemService} from './listaitemservice';
import {ItemService} from '../item/itemservice'
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-listaitem',
  providers : [ListaItemService, ItemService],
  templateUrl: './listaitem.component.html',
  styleUrls: ['./listaitem.component.css']
})
export class ListaitemComponent implements OnInit {
  title = 'Lista Item';
	itemListas: ItemLista[];
	itemLista : ItemLista;
  item : Item;
  listaTarefa : ListaTarefa;
  idLista : string;
  itens : Item[] = new Array<Item>();
  	constructor(private _listaItemService : ListaItemService, private router: Router,
      private activatedRoute: ActivatedRoute, private _itemService : ItemService){
    this.itemListas = [];
	  this.itemLista = new ItemLista;
    this.item = new Item;
    
    this.listaTarefa = new ListaTarefa;
    this.idLista = "";
	}
  ngOnInit(): void {
    const objeto = sessionStorage.getItem("listatarefa");
    if( objeto != null) { 
      this.listaTarefa = JSON.parse(objeto);
      this.itemLista.listaTarefa = this.listaTarefa;
    }
    this.ListaItemLista(this.itemLista.listaTarefa.id.toString());
    this.ListarItem();
  }

  ListarItem() {
    this._itemService.itemListar().subscribe(itens => this.itens = itens);
    }

  ListaItemLista(idLista : string) {
		this._listaItemService.listaItemListar(idLista).subscribe(itemListas => this.itemListas = itemListas);
		}

    check(itemLista : ItemLista): void {
      itemLista.concluido = !itemLista.concluido;
      this._listaItemService.SaveListaItem(itemLista)
        .subscribe(itemLista => {
              
        this.ListaItemLista(this.itemLista.listaTarefa.id.toString());
        });
       
      
    }
  
    add(itemLista : ItemLista): void {
      this._listaItemService.SaveListaItem(itemLista)
        .subscribe(itemLista => {
              
        this.ListaItemLista(this.itemLista.listaTarefa.id.toString());
        });
       
    }
  
     remove(itemLista : ItemLista): void {
      this._listaItemService.DeleteListaItem(itemLista)
        .subscribe(itemLista => {
        this.ListaItemLista(this.itemLista.listaTarefa.id.toString());
        });
       
    }
}
