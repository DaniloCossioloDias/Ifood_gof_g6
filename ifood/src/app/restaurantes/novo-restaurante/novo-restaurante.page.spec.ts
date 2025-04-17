import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NovoRestaurantePage } from './novo-restaurante.page';

describe('NovoRestaurantePage', () => {
  let component: NovoRestaurantePage;
  let fixture: ComponentFixture<NovoRestaurantePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(NovoRestaurantePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
