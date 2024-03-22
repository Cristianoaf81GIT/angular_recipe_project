import { createReducer, on } from '@ngrx/store';
import { Ingredient } from '../../shared/ingredient.model';
import { addIngredient } from './shopping-list.action';

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
  }))
);
