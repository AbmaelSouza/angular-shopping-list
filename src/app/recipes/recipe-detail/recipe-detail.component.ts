import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe-list/recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.scss'
})
export class RecipeDetailComponent implements OnInit {
  selectedRecipe: Recipe;
  id:number;
  constructor(private recipeService: RecipeService, private route: ActivatedRoute,private router:Router) { }
  ngOnInit() {
    this.route.params.subscribe(
      (params)=>{
        this.id = +params['id'];
        this.selectedRecipe = this.recipeService.getRecipe(this.id);
    });
    
    
  }
  addToShoppingList(selectedRecipe: Recipe) {
    this.recipeService.addIngredientsToShoppingList(selectedRecipe.ingredients);
  }
  onEditRecipe(){
      this.router.navigate(['edit'],{relativeTo:this.route})
  }
}
