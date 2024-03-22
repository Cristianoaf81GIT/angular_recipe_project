import { createAction, props } from '@ngrx/store';
import { Ingredient } from '../../shared/ingredient.model';

export const ADD_INGREDIENT = '[Shopping-List] addIngredient';

export const addIngredient = createAction(
  ADD_INGREDIENT,
  props<{ingredient: Ingredient}>()
);
