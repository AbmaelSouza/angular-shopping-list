import { EventEmitter } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";

export class ShoppingListService{
    ingredientsChanged = new EventEmitter<Ingredient[]>();
    private ingredients: Ingredient[] = [
        new Ingredient("Creme de leite", 300, 'g'),
        new Ingredient("Milho verde", 200, 'g'),
        new Ingredient("Requeijão cremoso", 200, 'g'),
        new Ingredient("Azeitona sem caroço", 100, 'g'),
        new Ingredient("Peito de frango desfiado", 400, 'g'),
        new Ingredient("Queijo mussarela fatiado", 200, 'g'),
        new Ingredient("Batata palha", 100, 'g'),
        new Ingredient("Água", 240, 'ml')
    ];
  addIngredient(ingredient:Ingredient){
      this.ingredients.push(ingredient);
      this.ingredientsChanged.emit(this.ingredients.slice());
  }
  addIngredients(ingredients:Ingredient[]){
    this.ingredients.push(...ingredients);
    this.ingredientsChanged.emit(this.ingredients.slice());
  }
  getIngredients(){
    return this.ingredients.slice();
  }
  clearIngredients(){
    this.ingredients = [];
    this.ingredientsChanged.emit(this.ingredients.slice());
  }
}