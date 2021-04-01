import { Meta, Story } from "@storybook/react";
import { task, taskEither } from "fp-ts";
import { pipe } from "fp-ts/function";
import { ReaderTaskEither } from "fp-ts/ReaderTaskEither";
import { useState } from "react";
import { FormData } from "../components/ItemForm";
import { ListPage as ListPageComponent } from "../components/ListPage/ListPage";
import { eqItem, Item } from "../globalDomain";
import { removeItemFromArray, setChangedArrayItem } from "../utils/arrayUtils";
import { fakeItems } from "./utils";
import { W2DStory } from "./W2DStory";

interface Props {}

const ListPageTemplate: Story<Props> = () => {
  const [items, setItems] = useState(fakeItems as Item[]);

  const onListItemChange: ReaderTaskEither<Item, string, void> = (
    changedItem
  ) =>
    pipe(
      () => setItems(setChangedArrayItem(items, changedItem, eqItem)),
      task.fromIO,
      task.delay(500),
      taskEither.rightTask
    );

  const onListItemDelete: ReaderTaskEither<Item, string, void> = (
    deletedItem
  ) =>
    pipe(
      () => setItems(removeItemFromArray(items, deletedItem, eqItem)),
      task.fromIO,
      task.delay(500),
      taskEither.rightTask
    );

  const onListItemCreate: ReaderTaskEither<FormData, string, void> = (
    createdItem
  ) =>
    pipe(
      () => {
        const item: Item = {
          ...createdItem,
          id: Math.max(...items.map((item) => item.id)) + 1,
          createdAt: new Date(),
          updatedAt: new Date(),
          isDone: false,
        };

        setItems([item, ...items]);
      },
      task.fromIO,
      task.delay(500),
      taskEither.rightTask
    );

  return (
    <W2DStory>
      <ListPageComponent
        items={items}
        onListItemChange={onListItemChange}
        onListItemDelete={onListItemDelete}
        onListItemCreate={onListItemCreate}
      />
    </W2DStory>
  );
};

export const ListPage = ListPageTemplate.bind({});

ListPage.args = {};
ListPage.argTypes = {};

const meta: Meta = {
  title: "WhatTodo/Pages/List Page",
};

export default meta;
