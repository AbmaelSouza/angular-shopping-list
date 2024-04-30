import { Component, Input } from '@angular/core';
import { Recipe } from '../recipe-list/recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.scss'
})
export class RecipeDetailComponent {
  @Input() selectedRecipe: Recipe;
  recipe: any;
  constructor(private recipeService: RecipeService) { }
  addToShoppingList(selectedRecipe: Recipe) {
      this.recipeService.addIngredientsToShoppingList(selectedRecipe.ingredients);
  }
}
