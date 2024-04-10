import { createReducer, on } from '@ngrx/store';
import { Ingredient } from '../../shared/ingredient.model';
import {
  addIngredient,
  addIngredients,
  deleteIngredient,
  updateIngredient,
} from './shopping-list.action';

export interface ShoppingListStateType {
  ingredients: Ingredient[];
}

const initialState: ShoppingListStateType = {
  ingredients: [new Ingredient('Apples', 5), new Ingredient('Tomatoes', 10)],
};

export const shoppingListReducer = createReducer(
  initialState,
  on(addIngredient, (state, action) => ({
    ...state,
    ingredients: [...state.ingredients, action.ingredient],
  })),
  on(addIngredients, (state, action) => ({
    ...state,
    ingredients: [...state.ingredients, ...action.ingredients],
  })),
  on(updateIngredient, (state, action) => {
    const currentIngredients = [...state.ingredients];
    const { ingredient, index } = action;
    if (index > -1 && ingredient && currentIngredients[index]) {
      currentIngredients[index] = ingredient;
      return {
        ...state,
        ingredients: [...currentIngredients],
      };
    } else {
      return state;
    }
  }),
  on(deleteIngredient, (state, action) => {
    const currentIngredients = [...state.ingredients];
    const { index } = action;
    if (index > -1 && currentIngredients[index]) {
      delete currentIngredients[index];
      return {
        ...state,
        ingredients: currentIngredients,
      };
    } else {
      return state;
    }
  })
);
