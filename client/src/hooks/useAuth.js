import useAxios, { POST } from "./useAxios";
import { LOGIN, REGISTER } from "@/pages/routes";
import { useContext, useState } from "react";
import { Session } from "@/context/user";
import {
  SIGNIN_FAILED,
  SIGNIN_SUCCESS,
  SIGNUP_EVENT,
  SIGN_OUT,
} from "../helpers/consts";
import { reloadPage } from "../helpers/window";
import storage from "@/helpers/storage";

/**
 * @param {object} options
 * @param {boolean} options.withProgressBar top linear progress bar
 * @param {boolean} options.withNotification pop-over notifications
 * @returns
 **/
const useAuth = ({ withProgressBar, withNotification } = {}) => {
  // custom hook
  const { loading, call } = useAxios(LOGIN, POST, {
    withProgressBar,
    withNotification,
  });
  // state
  const [response, setResponse] = useState(false);
  const [success, setSuccess] = useState(false);
  const [fail, setFail] = useState(false);
  // user context
  const { dispatch } = useContext(Session);

  const signIn = async (body, delayMs) => {
    let response = await call({ body, delayMs });
    // correct credentials
    if (response && response.status == 201) {
      let { data } = response;
      let { token, user } = data;
      storage.setToken(token);
      // dispatch success event
      dispatch({ action: SIGNIN_SUCCESS, user: user });
      setSuccess(true);
      // reloading the page
      reloadPage();
    } else {
      // wrong credentials
      dispatch({ action: SIGNIN_FAILED });
      setFail(true);
    }
  };

  const signUp = async (body, delayMs) => {
    let response = await call({ newPath: REGISTER, body: body, delayMs });
    // success
    if (response && response.status == 201) {
      let { data } = response;
      let { token, user } = data;
      storage.setToken(token);
      // event
      dispatch({ action: SIGNUP_EVENT, user: user });
      // api call data
      setResponse(response);
      setSuccess(true);
      // refreshig the page
      reloadPage();
      // failed
    } else {
      setFail(true);
    }
  };

  const signOut = async () => {
    storage.clearToken();
    // event
    dispatch({ action: SIGN_OUT });
    // refreshig the page
    reloadPage();
  };

  return { loading, signIn, signUp, signOut, success, fail, response };
};

export default useAuth;
