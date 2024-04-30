import { Component, ElementRef, EventEmitter, Output, ViewChild, viewChild } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrl: './shopping-edit.component.scss'
})
export class ShoppingEditComponent {
@ViewChild('nameInput') nameInputRef :ElementRef;
@ViewChild('amountInput') amountInputRef :ElementRef;
@ViewChild('unitInput') unitInputRef :ElementRef;
constructor(private shoppingListService:ShoppingListService){}

  onAddItem(){
    const newIngredient = new Ingredient(
      this.nameInputRef.nativeElement.value,
      this.amountInputRef.nativeElement.value,
      this.unitInputRef.nativeElement.value
    );
    this.shoppingListService.addIngredient(newIngredient);
  }
  clearList(){
    this.shoppingListService.clearIngredients();
  }
}
