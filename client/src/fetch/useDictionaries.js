import { UserContextData } from "@context";
import { useFetch } from "@hooks";
import axios from "axios";
import { useContext } from "react";

const useGetDictionary = (prefix) => {
  const userData = useContext(UserContextData);

  const response = useFetch({
    method: "get",
    url: `http://localhost:8080/api/private/dictionary${
      prefix ? "?" + prefix : ""
    }`,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: userData?.accessToken,
    },
    responseType: "json",
  });

  return response;
};

const usePostDictionary = async (props) => {
  const userData = useContext(UserContextData);

  const response = await axios.get(
    "http://localhost:8080/api/private/dictionary",
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: userData?.accessToken,
        "User-Agent": "any-name",
      },
    }
  );

  return response;
};

const useDelDictionary = async () => {
  const userData = useContext(UserContextData);

  const response = await axios.get(
    "http://localhost:8080/api/private/dictionary",
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: userData?.accessToken,
        "User-Agent": "any-name",
      },
    }
  );

  return response;
};

const usePutDictionary = async (props) => {
  const userData = useContext(UserContextData);

  const response = await axios.get(
    "http://localhost:8080/api/private/dictionary",
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: userData?.accessToken,
        "User-Agent": "any-name",
      },
    }
  );

  return response;
};

export {
  useDelDictionary,
  useGetDictionary,
  usePostDictionary,
  usePutDictionary,
};
