import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListaRestaurantesPage } from './lista-restaurantes.page';

describe('ListaRestaurantesPage', () => {
  let component: ListaRestaurantesPage;
  let fixture: ComponentFixture<ListaRestaurantesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaRestaurantesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
