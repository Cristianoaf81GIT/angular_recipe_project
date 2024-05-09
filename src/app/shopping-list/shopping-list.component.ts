import { Component, OnInit, OnDestroy } from "@angular/core";
import { Observable, Subscription } from "rxjs";

import { Ingredient } from "../shared/ingredient.model";
// import { ShoppingListService } from './shopping-list.service';
import { LoggingService } from "../logging.service";
import { Store } from "@ngrx/store";
import { shoppingListSelector } from "./store/shopping-list.selector";
import * as fromShoppingList from "./store/shopping-list.reducer";
import * as shoppingListActions from "./store/shopping-list.action";

@Component({
  selector: "app-shopping-list",
  templateUrl: "./shopping-list.component.html",
  styleUrls: ["./shopping-list.component.css"]
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  private subscription: Subscription;
  obsIngredients: Observable<Ingredient[]>;
  hideIngredients = false;

  constructor(
    // private slService: ShoppingListService,
    private loggingService: LoggingService,
    private store: Store<fromShoppingList.AppState>
  ) {}

  ngOnInit() {
    this.obsIngredients = this.store.select(shoppingListSelector);
    this.obsIngredients.subscribe({
      next: (ing) => {
        const allNull = ing.every((i) => i == null);
        if (allNull) {
          this.hideIngredients = true;
        } else {
          this.hideIngredients = false;
        }
      }
    });
    this.loggingService.printLog("Hello from ShoppingListComponent ngOnInit!");
  }

  onEditItem(index: number) {
    // this.slService.startedEditing.next(index);
    // console.log(`index=${index}`);
    this.store.dispatch(shoppingListActions.startEditIngredient({ index }));
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
