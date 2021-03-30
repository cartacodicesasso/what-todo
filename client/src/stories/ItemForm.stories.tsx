import { Meta, Story } from "@storybook/react";
import { W2DStory } from "./W2DStory";
import { ItemForm as ItemFormComponent } from "../components/ItemForm";
import { boolean, option, task, taskEither } from "fp-ts";
import { Reader } from "fp-ts/Reader";
import { FormData } from "../components/ItemForm";
import { pipe } from "fp-ts/lib/pipeable";
import { IO } from "fp-ts/IO";

interface Props {
  onSubmit: Reader<FormData, unknown>;
  onCancel: IO<void>;
  shouldFail: boolean;
}

const ItemFormTemplate: Story<Props> = (props) => {
  return (
    <W2DStory>
      <ItemFormComponent
        item={option.none}
        onCancel={props.onCancel}
        onSubmit={(data) =>
          pipe(
            props.shouldFail,
            boolean.fold(
              () =>
                pipe(
                  () => props.onSubmit(data),
                  task.fromIO,
                  task.delay(500),
                  taskEither.rightTask
                ),
              () => taskEither.left("I'm an error!")
            )
          )
        }
      />
    </W2DStory>
  );
};

export const ItemForm = ItemFormTemplate.bind({});

ItemForm.args = {
  shouldFail: false,
};

ItemForm.argTypes = {
  shouldFail: {
    name: "Should fail",
    description: "Set this to true to make the form submission fail",
    control: "boolean",
  },
  onSubmit: {
    action: "onSubmit",
  },
  onCancel: {
    action: "onCancel",
  },
};

const meta: Meta = {
  title: "WhatTodo/Components/Item Form",
};

export default meta;
