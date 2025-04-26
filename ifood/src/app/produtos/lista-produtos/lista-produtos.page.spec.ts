import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListaProdutosPage } from './lista-produtos.page';

describe('ListaProdutosPage', () => {
  let component: ListaProdutosPage;
  let fixture: ComponentFixture<ListaProdutosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaProdutosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
