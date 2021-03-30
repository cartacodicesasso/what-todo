import { Meta, Story } from "@storybook/react";
import { boolean, readerTaskEither, taskEither } from "fp-ts";
import { pipe } from "fp-ts/function";
import { Reader } from "fp-ts/Reader";
import { ReaderTaskEither } from "fp-ts/ReaderTaskEither";
import {
  LoginForm as LoginFormComponent,
  LoginRequestInput,
} from "../components/LoginForm";
import { W2DStory } from "./W2DStory";

interface Props {
  shouldFail: boolean;
  onSubmit: Reader<LoginRequestInput, void>;
}

const LoginFormTemplate: Story<Props> = (props) => {
  const onSubmit: ReaderTaskEither<LoginRequestInput, string, void> = pipe(
    props.shouldFail,
    boolean.fold(
      () => (input: LoginRequestInput) =>
        taskEither.fromIO(() => props.onSubmit(input)),
      () => readerTaskEither.left("I'm an error!")
    )
  );

  return (
    <W2DStory>
      <LoginFormComponent onSubmit={onSubmit} />
    </W2DStory>
  );
};

export const LoginForm = LoginFormTemplate.bind({});

LoginForm.args = {
  shouldFail: false,
};

LoginForm.argTypes = {
  shouldFail: {
    name: "Should fail",
    description: "Set this to true for making login fail",
    control: "boolean",
  },
  onSubmit: {
    action: "On submit",
  },
};

const meta: Meta = {
  title: "WhatTODO/Components/Login Form",
};

export default meta;
