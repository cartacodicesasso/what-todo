import { Meta, Story } from "@storybook/react";
import { boolean, either, option, task, taskEither } from "fp-ts";
import { pipe } from "fp-ts/lib/function";
import { IO } from "fp-ts/IO";
import { ReaderTaskEither } from "fp-ts/ReaderTaskEither";
import { useState } from "react";
import { ListItem as ListItemComponent } from "../components/ListItem/ListItem";
import { Item } from "../globalDomain";
import { W2DStory } from "./W2DStory";
import { NonEmptyString } from "io-ts-types";

interface Props {
  title: NonEmptyString;
  description: string;
  dueDate: string;
  shouldFail: boolean;
  onDelete: IO<unknown>;
}

const ListItemTemplate: Story<Props> = (props) => {
  const [item, setItem] = useState<Item>({
    ...props,
    id: 42,
    description: pipe(
      props.description,
      NonEmptyString.decode,
      option.fromEither
    ),
    createdAt: new Date(),
    updatedAt: new Date(),
    dueDate: option.some(new Date(props.dueDate)),
    isDone: false,
    priority: 3,
  });

  const onChange: ReaderTaskEither<Item, string, unknown> = (item) =>
    pipe(
      () =>
        pipe(
          props.shouldFail,
          boolean.fold(
            () => {
              setItem(item);
              return either.right(null);
            },
            () => either.left("I'm an error!")
          )
        ),
      task.fromIO,
      task.delay(500)
    );

  const onDelete = pipe(
    task.fromIO(props.onDelete),
    task.delay(500),
    taskEither.rightTask
  );

  return (
    <W2DStory>
      <ListItemComponent item={item} onChange={onChange} onDelete={onDelete} />
    </W2DStory>
  );
};

export const ListItem = ListItemTemplate.bind({});

ListItem.args = {
  title: "Title",
  description:
    "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempora expedita quia officia nemo ut corporis.",
  dueDate: new Date(1980, 7, 15).toISOString(),
};

ListItem.argTypes = {
  title: {
    name: "Title",
    control: "text",
  },
  description: {
    name: "Description",
    control: "text",
  },
  dueDate: {
    name: "Due date",
    control: "date",
  },
  shouldFail: {
    name: "Should fail",
    description: "Set this to true for making done state change fail",
    control: "boolean",
  },
  onDelete: {
    action: "onDelete",
  },
};

const meta: Meta = {
  title: "WhatTODO/Components/List Item",
};

export default meta;
