import { Meta, Story } from "@storybook/react";
import { Reader } from "fp-ts/Reader";
import { AccountData } from "../contexts/AccountContext";
import { LoginPage as LoginPageComponent } from "../components/LoginPage";
import { W2DStory } from "./W2DStory";

interface Props {
  onLogin: Reader<AccountData, void>;
}

const LoginPageTemplate: Story<Props> = (props) => {
  return (
    <W2DStory>
      <LoginPageComponent onLogin={props.onLogin} />
    </W2DStory>
  );
};

export const LoginPage = LoginPageTemplate.bind({});

LoginPageTemplate.argTypes = {
  onLogin: {
    action: "onLogin",
  },
};

const meta: Meta = {
  title: "WhatTODO/Pages/Login Page",
};

export default meta;
