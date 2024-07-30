import { UserContextData } from "@context";
import axios from "axios";
import { useContext } from "react";

const useGetDictionary = (prefix) => {
  const userData = useContext(UserContextData);

  const get = async () => {
    const response = await axios({
      method: "GET",
      url: `http://localhost:8080/api/private/dictionary${
        prefix ? "?" + prefix : ""
      }`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: userData?.accessToken,
      },
    });
    if (response.status === 200) {
      dispatchEvent("snackbarTrigger", {
        status: "success",
        message: "created successfully",
      });
      dispatchEvent("onReload");
    }
  };

  return { get };
};

const usePostDictionary = () => {
  const userData = useContext(UserContextData);

  const post = async (dictionaryData) => {
    const response = await axios({
      method: "POST",
      url: "http://localhost:8080/api/private/dictionary",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: userData?.accessToken,
      },
      data: dictionaryData,
    });
    if (response.status === 200) {
      dispatchEvent("snackbarTrigger", {
        status: "success",
        message: "created successfully",
      });
      dispatchEvent("onReload");
    }
  };

  return { post };
};

const useDelDictionary = async (prefix) => {
  const userData = useContext(UserContextData);

  const del = async () => {
    const response = await axios({
      method: "DELETE",
      url: `http://localhost:8080/api/private/dictionary${
        prefix ? "?" + prefix : ""
      }`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: userData?.accessToken,
      },
    });
    if (response.status === 200) {
      dispatchEvent("snackbarTrigger", {
        status: "success",
        message: "created successfully",
      });
      dispatchEvent("onReload");
    }
  };

  return { del };
};

const usePutDictionary = async () => {
  const userData = useContext(UserContextData);

  const put = async (dictionaryData) => {
    const response = await axios({
      method: "PUT",
      url: "http://localhost:8080/api/private/dictionary",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: userData?.accessToken,
      },
      data: dictionaryData,
    });
    if (response.status === 200) {
      dispatchEvent("snackbarTrigger", {
        status: "success",
        message: "created successfully",
      });
      dispatchEvent("onReload");
    }
  };

  return { put };
};

export {
  useDelDictionary,
  useGetDictionary,
  usePostDictionary,
  usePutDictionary,
};
