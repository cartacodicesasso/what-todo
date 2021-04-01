import { constVoid } from "fp-ts/function";
import { Reader } from "fp-ts/Reader";
import { createContext, FC, useReducer } from "react";

interface User {
  username: string;
  roles: string[];
}

interface AnonymousState {
  type: "anonymous";
}

export interface AccountData {
  user: User;
  token: string;
}

type LoggedInState = {
  type: "loggedIn";
} & AccountData;

type AccountState = AnonymousState | LoggedInState;

export function foldAccount<T>(
  whenAnonymous: Reader<AnonymousState, T>,
  whenLoggedIn: Reader<LoggedInState, T>
): (account: AccountState) => T {
  return function (account) {
    switch (account.type) {
      case "anonymous":
        return whenAnonymous(account);
      case "loggedIn":
        return whenLoggedIn(account);
    }
  };
}

type LoginAction = {
  type: "login";
} & AccountData;

interface LogoutAction {
  type: "logout";
}

type AccountAction = LoginAction | LogoutAction;

export function accountReducer(
  state: AccountState,
  action: AccountAction
): AccountState {
  switch (state.type) {
    case "anonymous":
      switch (action.type) {
        case "login":
          return {
            type: "loggedIn",
            user: action.user,
            token: action.token,
          };
        case "logout":
          return state;
      }
    case "loggedIn":
      switch (action.type) {
        case "login":
          return state;
        case "logout":
          return {
            type: "anonymous",
          };
      }
  }
}

interface AccountContext {
  accountState: AccountState;
  dispatchAccountAction: Reader<AccountAction, void>;
}

export const AccountContext = createContext<AccountContext>({
  accountState: {
    type: "anonymous",
  },
  dispatchAccountAction: constVoid,
});

export const AccountContextProvider: FC = (props) => {
  const [state, dispatch] = useReducer(accountReducer, {
    type: "anonymous",
  });

  return (
    <AccountContext.Provider
      value={{
        accountState: state,
        dispatchAccountAction: dispatch,
      }}
    >
      {props.children}
    </AccountContext.Provider>
  );
};

/*
And then, le toucan
░░░░░░░░▄▄▄▀▀▀▄▄███▄░░░░░░░░░░░░░░░░░
░░░░░▄▀▀░░░░░░░▐░▀██▌░░░░░░░░░░░░░░░░
░░░▄▀░░░░▄▄███░▌▀▀░▀█░░░░░░░░░░░░░░░░
░░▄█░░▄▀▀▒▒▒▒▒▄▐░░░░█▌░░░░░░░░░░░░░░░
░▐█▀▄▀▄▄▄▄▀▀▀▀▌░░░░░▐█▄░░░░░░░░░░░░░░
░▌▄▄▀▀░░░░░░░░▌░░░░▄███████▄░░░░░░░░░
░░░░░░░░░░░░░▐░░░░▐███████████▄░░░░░░
*/
