import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Recipe } from './recipe.model';
import { DataStorageService } from '../shared/data-storage.service';
import { Observable } from 'rxjs';
import { RecipeService } from './recipe.service';


@Injectable({ providedIn: 'root'})
export class RecipesResoverService implements Resolve<Recipe[]> {
  constructor(
    private dataStorage: DataStorageService, 
    private recipeService: RecipeService
  ) {}

  resolve(
    _route: ActivatedRouteSnapshot, 
    _state: RouterStateSnapshot
  ): Observable<Recipe[]> | Recipe[] {
    const recipes = this.recipeService.getRecipes();
    if (recipes.length === 0) {
      return this.dataStorage.fetchRecipes();
    } else {
      return recipes;
    }
    
  }
}
