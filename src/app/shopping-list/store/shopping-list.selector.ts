import { createSelector } from "@ngrx/store";
import { ShoppingListStateType } from "./shopping-list.reducer";

const projector = (state: {shoppingList: ShoppingListStateType}) => state.shoppingList.ingredients;
export const shoppingListSelector = createSelector(projector, (state) => state);
