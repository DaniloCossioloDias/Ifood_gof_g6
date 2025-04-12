import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditarRestaurantePage } from './editar-restaurante.page';

describe('EditarRestaurantePage', () => {
  let component: EditarRestaurantePage;
  let fixture: ComponentFixture<EditarRestaurantePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarRestaurantePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
