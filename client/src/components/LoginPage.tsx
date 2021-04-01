import { FC } from "react";
import { APIError, usePost } from "../api";
import { pipe } from "fp-ts/function";
import { taskEither } from "fp-ts";
import { LoginForm } from "./LoginForm";
import { Reader } from "fp-ts/Reader";
import { AccountData } from "../contexts/AccountContext";

interface LoginRequestInput {
  username: string;
  password: string;
}

interface LoginRequestOutput {
  roles: string[];
  username: string;
}

function parseError(error: APIError): string {
  return error.message;
}

interface Props {
  onLogin: Reader<AccountData, unknown>;
}

export const LoginPage: FC<Props> = (props) => {
  const login = usePost<LoginRequestInput, LoginRequestOutput>("/login");

  const onLogin = (loginData: LoginRequestInput) =>
    pipe(
      login(loginData),
      taskEither.bimap(parseError, (loginRequestOutput) => {
        props.onLogin({
          user: loginRequestOutput,
          token: window.btoa(`${loginData.username}:${loginData.password}`),
        });
      })
    );

  return (
    <div className="LoginPage">
      <LoginForm onSubmit={onLogin} />
    </div>
  );
};
