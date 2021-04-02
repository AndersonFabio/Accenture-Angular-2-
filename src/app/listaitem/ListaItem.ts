export class ItemLista {
id : Number ;
concluido : boolean;
item : Item = new Item;
listaTarefa : ListaTarefa = new ListaTarefa;
constructor() {
this.id = 0;
this.concluido = false;
}
}

export class Item {
id : Number;
descricao : string;

constructor() {
    this.id = 0;
    this.descricao = "";
}
}

export class ListaTarefa {
    id : Number;
    descricao : string;
    itensLista : Array<ItemLista>;
    constructor() {
        this.id = 0;
        this.descricao = "";
        this.itensLista = new Array<ItemLista>();
    }
}

