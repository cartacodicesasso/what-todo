import { readerTaskEither } from "fp-ts";
import { constVoid, pipe } from "fp-ts/function";
import { Reader } from "fp-ts/Reader";
import { FC, useContext } from "react";
import {
  AccountContext,
  AccountData,
  foldAccount,
} from "../contexts/AccountContext";
import { LoginPage } from "./LoginPage";
import { ListPage } from "./ListPage/ListPage";

export const ApiController: FC = () => {
  const { accountState, dispatchAccountAction } = useContext(AccountContext);

  const onLogin: Reader<AccountData, void> = (data) => {
    dispatchAccountAction({
      type: "login",
      ...data,
    });
  };

  return pipe(
    accountState,
    foldAccount(
      () => <LoginPage onLogin={onLogin} />,
      () => (
        <ListPage
          items={[]}
          onListItemCreate={readerTaskEither.fromIO(constVoid)}
          onListItemChange={readerTaskEither.fromIO(constVoid)}
          onListItemDelete={readerTaskEither.fromIO(constVoid)}
        />
      )
    )
  );
};
