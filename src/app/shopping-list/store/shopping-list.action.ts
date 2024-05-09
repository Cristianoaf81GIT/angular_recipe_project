import { createAction, props } from "@ngrx/store";
import { Ingredient } from "../../shared/ingredient.model";

export const ADD_INGREDIENT = "[Shopping-List] addIngredient";
export const ADD_INGREDIENTS = "[Shopping-list] addIngredients";
export const UPDATE_INGREDIENT = "[Shopping-List] updateIngredient";
export const DELETE_INGREDIENT = "[Shopping-list] deleteIngredient";
export const START_DELETE_INGREDIENT = "[Shopping-list] startEdit";
export const STOP_DELETE_INGREDIENT = "[Shopping-list] stopEdit";

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

export const startEditIngredient = createAction(
  START_DELETE_INGREDIENT,
  props<{ index: number }>()
);

export const endEditIngredient = createAction(STOP_DELETE_INGREDIENT);
