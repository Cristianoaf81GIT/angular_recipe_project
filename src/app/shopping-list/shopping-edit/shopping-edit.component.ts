import { Component, OnInit, OnDestroy, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Subscription } from "rxjs";
import { Store } from "@ngrx/store";

import { Ingredient } from "../../shared/ingredient.model";
// import { ShoppingListService } from '../shopping-list.service';
import * as ShoppingListActions from "../store/shopping-list.action";
import * as fromShoppingList from "../store/shopping-list.reducer";
import * as ShoppingListSelectors from "../store/shopping-list.selector";

@Component({
  selector: "app-shopping-edit",
  templateUrl: "./shopping-edit.component.html",
  styleUrls: ["./shopping-edit.component.css"]
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild("f", { static: false }) slForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;

  constructor(
    // private slService: ShoppingListService,
    private store: Store<fromShoppingList.AppState>
  ) {}

  ngOnInit() {
    this.subscription = this.store
      .select(ShoppingListSelectors.shoppingListStateSelector)
      .subscribe({
        next: (shoppingListData) => {
          if (shoppingListData.editedIngredientIndex > -1) {
            this.editMode = true;
            this.editedItem = shoppingListData.editedIngredient!;
            this.editedItemIndex = shoppingListData.editedIngredientIndex;
            this.slForm.setValue({
              name: this.editedItem.name,
              amount: this.editedItem.amount
            });
          } else {
            this.editMode = false;
          }
        }
      });
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if (this.editMode) {
      this.store.dispatch(
        ShoppingListActions.updateIngredient({
          ingredient: newIngredient,
          index: this.editedItemIndex
        })
      );
    } else {
      this.store.dispatch(
        ShoppingListActions.addIngredient({ ingredient: newIngredient })
      );
    }
    this.editMode = false;
    form.reset();
  }

  onClear() {
    this.slForm.reset();
    this.editMode = false;
    this.store.dispatch(ShoppingListActions.endEditIngredient());
  }

  onDelete() {
    // this.slService.deleteIngredient(this.editedItemIndex);
    this.store.dispatch(
      ShoppingListActions.deleteIngredient({ index: this.editedItemIndex })
    );
    this.onClear();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.store.dispatch(ShoppingListActions.endEditIngredient());
  }
}
