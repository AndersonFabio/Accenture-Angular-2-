import { Component, OnInit } from '@angular/core';
import {Item} from './Item';
import {ItemService} from './itemservice';
import { Router } from '@angular/router';
//import { ROUTER_DIRECTIVES } from '@angular/router';
//import { FormsModule } from '@angular/forms';
//import {NgForm}    from 'angular2/common';

@Component({
  selector: 'app-lista',
  providers : [ItemService],
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  title = 'Item';
	itens: Item[];
	item : Item;
  
ListarItem() {
this._itemService.itemListar().subscribe(itens => this.itens = itens);
}

	constructor(private _itemService : ItemService, private router: Router){
    this.itens = [];
	this.item = new Item;

	}
	
	ngOnInit() : void{
	this.ListarItem();
 	}


	 add(item : Item): void {
		this._itemService.SaveItem(item)
		  .subscribe(item => {
        this.item.descricao = "";
			this.ListarItem();
		  });
		 
	}

	 remove(item : Item): void {
		this._itemService.DeleteItem(item)
		  .subscribe(item => {
			this.ListarItem();
		  });
	}


}