import { Eq } from "fp-ts/Eq";

export function setChangedArrayItem<A>(
  items: A[],
  changedItem: A,
  eq: Eq<A>
): A[] {
  return items.map((item) => {
    if (eq.equals(item, changedItem)) {
      return changedItem;
    } else {
      return item;
    }
  });
}

export function removeItemFromArray<A>(
  items: A[],
  deletedItem: A,
  eq: Eq<A>
): A[] {
  return items.filter((item) => !eq.equals(item, deletedItem));
}
