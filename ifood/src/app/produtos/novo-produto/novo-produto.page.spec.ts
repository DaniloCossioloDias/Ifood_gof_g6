import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NovoProdutoPage } from './novo-produto.page';

describe('NovoProdutoPage', () => {
  let component: NovoProdutoPage;
  let fixture: ComponentFixture<NovoProdutoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(NovoProdutoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
