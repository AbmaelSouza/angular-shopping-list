import { EventEmitter, Injectable, inject } from "@angular/core";
import { Recipe } from "./recipe-list/recipe.model";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";

@Injectable()
export class RecipeService{
    recipeSelected = new EventEmitter<Recipe>();
    private recipes:Recipe[] = [
        new Recipe('Fricasse',
         'Fricasse de frango',
          'https://static.itdg.com.br/images/360-240/da75a407d98d63d78f276ef939b69e7f/278845-original.jpg'
        ,[ new Ingredient("Creme de leite", 300, 'g'),
        new Ingredient("Milho verde", 200, 'g'),
        new Ingredient("Requeijão cremoso", 200, 'g'),
        new Ingredient("Azeitona sem caroço", 100, 'g'),
        new Ingredient("Peito de frango desfiado", 400, 'g'),
        new Ingredient("Queijo mussarela fatiado", 200, 'g'),
        new Ingredient("Batata palha", 100, 'g'),
        new Ingredient("Água", 240, 'ml')
      ]),

      new Recipe(
        'Pizza Margherita',
        'Uma pizza clássica italiana',
        'https://s2-receitas.glbimg.com/wb7DIMyCpEyV07sTAtcDWD8HQjw=/0x0:1200x675/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_1f540e0b94d8437dbbc39d567a1dee68/internal_photos/bs/2024/h/r/EfCbvqTbeDRAD3Lzc5xA/pizza-margherita.jpg',
        [
          new Ingredient("Massa de pizza", 1, 'unidade'),
          new Ingredient("Molho de tomate", 200, 'g'),
          new Ingredient("Queijo mussarela fresco", 200, 'g'),
          new Ingredient("Folhas de manjericão fresco", 10, 'folhas'),
          new Ingredient("Azeite de oliva extra virgem", 2, 'colheres de sopa'),
          new Ingredient("Sal", 1, 'pitada'),
          new Ingredient("Pimenta preta moída", 1, 'pitada')
        ]
      ),      ];
        constructor(private shoppingListService:ShoppingListService){}
      getRecipes(){
        return this.recipes.slice();
      }
      addIngredientsToShoppingList(ingredients: Ingredient[]){
          this.shoppingListService.addIngredients(ingredients)
      }
      getRecipe(id:number){
        return this.recipes.slice()[id];
      }
}