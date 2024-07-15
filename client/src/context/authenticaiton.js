import { createContext } from "react";
import { getLocalStorageValue, setLocalStorageValue } from "@utils";

class User {
  get isAuth() {
    return getLocalStorageValue("isAuth") ?? false;
  }

  set isAuth(isAuth) {
    setLocalStorageValue("isAuth", isAuth);
  }
}

const UserContextData = createContext(undefined);

const Default = (props) => {
  return <UserContextData.Provider {...props} value={new User()} />;
};

export { Default as UserContext, UserContextData };
