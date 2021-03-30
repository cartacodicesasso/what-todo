import { Meta, Story } from "@storybook/react";
import { LoginPage as LoginPageComponent } from "../pages/LoginPage";
import { W2DStory } from "./W2DStory";

const LoginPageTemplate: Story = () => {
  return (
    <W2DStory>
      <LoginPageComponent />
    </W2DStory>
  );
};

export const LoginPage = LoginPageTemplate.bind({});

const meta: Meta = {
  title: "WhatTODO/Pages/Login Page",
};

export default meta;
