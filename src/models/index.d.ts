import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";



export declare class ShoppingListItem {
  readonly id: string;
  readonly itemName: string;
  constructor(init: ModelInit<ShoppingListItem>);
  static copyOf(source: ShoppingListItem, mutator: (draft: MutableModel<ShoppingListItem>) => MutableModel<ShoppingListItem> | void): ShoppingListItem;
}