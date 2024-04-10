import { createAction, props } from '@ngrx/store';
import { Ingredient } from '../../shared/ingredient.model';

export const ADD_INGREDIENT = '[Shopping-List] addIngredient';
export const ADD_INGREDIENTS = '[Shopping-list] addIngredients';
export const UPDATE_INGREDIENT = '[Shopping-List] updateIngredient';
export const DELETE_INGREDIENT = '[Shopping-list] deleteIngredient';

export const addIngredient = createAction(
  ADD_INGREDIENT,
  props<{ ingredient: Ingredient }>()
);

export const addIngredients = createAction(
  ADD_INGREDIENTS,
  props<{ ingredients: Ingredient[] }>()
);

export const updateIngredient = createAction(
  UPDATE_INGREDIENT,
  props<{ index: number; ingredient: Ingredient }>()
);

export const deleteIngredient = createAction(
  DELETE_INGREDIENT,
  props<{ index: number }>()
);
