import { eq } from "fp-ts";
import { Eq } from "fp-ts/Eq";
import { pipe } from "fp-ts/function";
import { Option } from "fp-ts/Option";
import { NonEmptyString } from "io-ts-types";

export type Priority = 1 | 2 | 3;
export type PriorityName = "High" | "Medium" | "Low";

export function getPriorityName(priority: Priority): PriorityName {
  return pipe(
    priority,
    foldPriority(
      () => "Low",
      () => "Medium",
      () => "High"
    )
  );
}

export function getPriority(priority: PriorityName): Priority {
  return pipe(
    priority,
    foldPriorityName(
      () => 1,
      () => 2,
      () => 3
    )
  );
}

export function foldPriority<T>(
  whenLow: () => T,
  whenMedium: () => T,
  whenHigh: () => T
): (priority: Priority) => T {
  return (priority) => {
    switch (priority) {
      case 1:
        return whenLow();
      case 2:
        return whenMedium();
      case 3:
        return whenHigh();
    }
  };
}

export function foldPriorityName<T>(
  whenLow: () => T,
  whenMedium: () => T,
  whenHigh: () => T
): (priority: PriorityName) => T {
  return (priority) => {
    switch (priority) {
      case "Low":
        return whenLow();
      case "Medium":
        return whenMedium();
      case "High":
        return whenHigh();
    }
  };
}

export interface Item {
  id: number;
  title: NonEmptyString;
  description: Option<NonEmptyString>;
  dueDate: Option<Date>;
  isDone: boolean;
  createdAt: Date;
  updatedAt: Date;
  priority: Priority;
}

export const eqItem: Eq<Item> = eq.getStructEq({
  id: eq.eqNumber,
});
