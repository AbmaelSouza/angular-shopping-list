import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";

@Injectable()
export class ShoppingListService {
  ingredientsChanged = new Subject<Ingredient[]>();
  private ingredients: Ingredient[] = [];

  constructor(private http: HttpClient) { }

  addIngredient(ingredient: Ingredient) {

    this.http.post<
      { message: string, ingredients: any }
    >
      (`http://localhost:3000/api/ingredients`, [ingredient])
      .pipe(map((data) => {
        data.ingredients = data.ingredients.map(ingredient =>
          ingredient = new Ingredient(
            ingredient.name,
            ingredient.amount,
            ingredient.unit,
            ingredient._id
          ));
        return data;
      }))
      .subscribe(
        (data) => {
          this.ingredients = data.ingredients;

          this.ingredientsChanged.next(data.ingredients.slice())
        },
        (error) => {
          alert('o servidor não foi encontrado!')
        }
      );
  }

  addIngredients(ingredients: Ingredient[]) {

    this.http.post<
      { message: string }
    >
      (`http://localhost:3000/api/ingredients`, ingredients)
      .subscribe(
        () => {
          //no ingredient treatment needed
          //no subject needs to receive next()
          //because it is not on the route of view
        },
        (error) => {
          alert('o servidor não foi encontrado!')
        }
      );

  }

  getIngredients() {
    this.http.get<
      { message: string, ingredients: any }
    >
      ('http://localhost:3000/api/ingredients')
      .pipe(map((data) => {
        data.ingredients = data.ingredients.map(ingredient =>
          ingredient = new Ingredient(
            ingredient.name,
            ingredient.amount,
            ingredient.unit,
            ingredient._id
          ));
        return data;
      }))
      .subscribe(
        (data) => {
          this.ingredients = data.ingredients;
          this.ingredientsChanged.next(this.ingredients.slice())
        },
        (error) => {
          alert('o servidor não foi encontrado!')
        }
      );
  }

  deleteIngredient(deleteIngredient:Ingredient){
    this.http.delete<
      { message: string, ingredients: Ingredient[] }
    >
      (`http://localhost:3000/api/ingredients/${deleteIngredient.id}`)
      .subscribe(
        (data) => {
          this.ingredients = this.ingredients.filter(ingredient => ingredient.id !== deleteIngredient.id);
          this.ingredientsChanged.next(this.ingredients.slice())
        },
        (error) => {
          alert('o servidor não foi encontrado!')
        }
      );
  }

  clearIngredients() {
    this.http.get<
      { message: string, ingredients: Ingredient[] }
    >
      (`http://localhost:3000/api/ingredients/clear/`)
      .subscribe(
        (data) => {
          this.ingredients = data.ingredients;
          this.ingredientsChanged.next(this.ingredients.slice())
        },
        (error) => {
          alert('o servidor não foi encontrado!')
        }
      );
  }
}