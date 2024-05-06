import { Component, OnDestroy, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.scss',
  providers:[]
})

export class ShoppingListComponent implements OnInit, OnDestroy{
  ingredients: Ingredient[] = [];
  private ingredientsChangedSubscription: Subscription;
  constructor(private shoppingListService:ShoppingListService){
  }
 
  ngOnInit() {
    this.ingredients = this.shoppingListService.getIngredients();
    this.ingredientsChangedSubscription = this.shoppingListService.ingredientsChanged.subscribe((ingredients:Ingredient[])=>{this.ingredients = ingredients;})
  }
  ngOnDestroy() {
    this.ingredientsChangedSubscription.unsubscribe();
  }
}
