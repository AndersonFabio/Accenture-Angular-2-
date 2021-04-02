import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaitemComponent } from './listaitem.component';

describe('ListaitemComponent', () => {
  let component: ListaitemComponent;
  let fixture: ComponentFixture<ListaitemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaitemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaitemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
