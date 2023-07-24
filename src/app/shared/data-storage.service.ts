import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { RecipeService } from '../recipes/recipe.service';
import { environment } from '../../environments/environment.development';
import { Recipe } from '../recipes/recipe.model';
import { map, tap } from 'rxjs/operators';
// import { AuthService } from '../auth/auth.service';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private recipeServices: RecipeService,
    // private authService: AuthService
  ) {}

  storeRecipes(): void {
    const recipes = this.recipeServices.getRecipes();
    this.http
      .put(`${environment.apiUrl}/recipes.json`,recipes)
      .subscribe(response => {
        console.log(response);
      });
  }

  fetchRecipes() {
    return this.http
      .get<Recipe[]>(`${environment.apiUrl}/recipes.json`)
      .pipe(
        map(recipes => recipes.map(recipe => ({
          ...recipe,
          ingredients: recipe.ingredients ? recipe.ingredients : []
        }))),
        tap(recipes => this.recipeServices.setRecipes(recipes)),
      );
   }
}
