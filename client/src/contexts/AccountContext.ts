interface User {
  username: string;
  roles: string[];
}

interface AnonymousUser {
  type: "anonymous";
}

interface LoggedInUser {
  type: "loggedIn";
  user: User;
}

type Account = AnonymousUser | LoggedInUser;

export function foldAccount<T>(
  whenAnonymous: (user: AnonymousUser) => T,
  whenLoggedIn: (user: LoggedInUser) => T
): (account: Account) => T {
  return function (account) {
    switch (account.type) {
      case "anonymous":
        return whenAnonymous(account);
      case "loggedIn":
        return whenLoggedIn(account);
    }
  };
}

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
