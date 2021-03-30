import { FC } from "react";
import { APIError, usePost } from "../api";
import { flow } from "fp-ts/function";
import { taskEither } from "fp-ts";
import { LoginForm } from "../components/LoginForm";

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

export const LoginPage: FC = () => {
  const login = usePost<LoginRequestInput, LoginRequestOutput>("/login");
  const onLogin = flow(login, taskEither.bimap(parseError, console.log));

  return (
    <div className="LoginPage">
      <LoginForm onSubmit={onLogin} />
    </div>
  );
};
