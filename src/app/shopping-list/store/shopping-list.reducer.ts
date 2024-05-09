import { createReducer, on } from "@ngrx/store";
import { Ingredient } from "../../shared/ingredient.model";
import {
  addIngredient,
  addIngredients,
  deleteIngredient,
  endEditIngredient,
  startEditIngredient,
  updateIngredient
} from "./shopping-list.action";

export interface ShoppingListStateType {
  ingredients: Ingredient[];
  editedIngredient?: Ingredient | null;
  editedIngredientIndex?: number;
}

export interface AppState {
  shoppingList: ShoppingListStateType;
}

const initialState: ShoppingListStateType = {
  ingredients: [new Ingredient("Apples", 5), new Ingredient("Tomatoes", 10)],
  editedIngredient: null,
  editedIngredientIndex: -1
};

export const shoppingListReducer = createReducer(
  initialState,
  on(addIngredient, (state, action) => ({
    ...state,
    ingredients: [...state.ingredients, action.ingredient]
  })),
  on(addIngredients, (state, action) => ({
    ...state,
    ingredients: [...state.ingredients, ...action.ingredients]
  })),
  on(updateIngredient, (state, action) => {
    const currentIngredients = [...state.ingredients];
    const { ingredient, index } = action;
    if (index > -1 && ingredient && currentIngredients[index]) {
      currentIngredients[index] = ingredient;
      return {
        ...state,
        ingredients: [...currentIngredients],
        editedIngredient: null,
        editedIngredientIndex: -1
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
        editedIngredientIndex: -1,
        editedIngredient: null
      };
    } else {
      return state;
    }
  }),
  on(startEditIngredient, (state, { index }) => ({
    ...state,
    editedIngredientIndex: index,
    editedIngredient: { ...state.ingredients[index] }
  })),
  on(endEditIngredient, (state) => ({
    ...state,
    editedIngredient: null,
    editedIngredientIndex: -1
  }))
);
