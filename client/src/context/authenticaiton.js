import { createContext } from "react";
import { getLocalStorageValue } from "@utils";

class User {
  isAuth = getLocalStorageValue("isAuth") ?? false;

  get Auth() {
    return this.isAuth;
  }

  set Auth(isAuth) {
    this.isAuth = isAuth;
  }
}

const UserContextData = createContext(undefined);

const Default = (props) => {
  return <UserContextData.Provider {...props} value={new User()} />;
};

export { Default as UserContext, UserContextData };
