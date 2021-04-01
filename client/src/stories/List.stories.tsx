import { Meta, Story } from "@storybook/react";
import { nonEmptyArray, option, task, taskEither } from "fp-ts";
import { constNull, pipe } from "fp-ts/function";
import { ReaderTaskEither } from "fp-ts/ReaderTaskEither";
import { useState } from "react";
import { List as ListComponent } from "../components/List/List";
import { eqItem, Item } from "../globalDomain";
import { fakeItems } from "./utils";
import { W2DStory } from "./W2DStory";
import { removeItemFromArray, setChangedArrayItem } from "../utils/arrayUtils";

interface Props {}

const ListTemplate: Story<Props> = () => {
  const [items, setItems] = useState(fakeItems as Item[]);

  const onListItemChange: ReaderTaskEither<Item, string, unknown> = (
    changedItem: Item
  ) =>
    pipe(
      () => setItems(setChangedArrayItem(items, changedItem, eqItem)),
      task.fromIO,
      task.delay(500),
      taskEither.rightTask
    );

  const onListItemDelete: ReaderTaskEither<Item, string, unknown> = (
    deletedItem: Item
  ) =>
    pipe(
      () => setItems(removeItemFromArray(items, deletedItem, eqItem)),
      task.fromIO,
      task.delay(500),
      taskEither.rightTask
    );

  return (
    <W2DStory>
      {pipe(
        items,
        nonEmptyArray.fromArray,
        option.fold(constNull, (items) => (
          <ListComponent
            items={items}
            onListItemChange={onListItemChange}
            onListItemDelete={onListItemDelete}
          />
        ))
      )}
    </W2DStory>
  );
};

export const List = ListTemplate.bind({});

const meta: Meta = {
  title: "WhatTODO/Components/List",
};

export default meta;
