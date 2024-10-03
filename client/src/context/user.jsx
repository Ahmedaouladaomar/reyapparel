import { createContext, useEffect, useReducer, useState } from "react";
import { IS_AUTHENTICATED } from "@/pages/routes";
import useAxios, { GET } from "@/hooks/useAxios";
import { abortController } from "@/axios";
import {
  SIGNIN_SUCCESS,
  SIGN_OUT,
  SIGNIN_FAILED,
  SIGNUP_EVENT,
} from "@/helpers/consts";
import storage from "@/helpers/storage";
import PageLoader from "@/components/PageLoader";

const initialValue = {
  signedIn: false,
  requireVerification: false,
  user: null,
};

export const Session = createContext({ state: initialValue });

export const Security = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialValue);
  const [complete, setComplete] = useState(false);
  const { call } = useAxios(IS_AUTHENTICATED, GET, { withProgressBar: true });

  function reducer(state, { action, user }) {
    switch (action) {
      case SIGNIN_SUCCESS:
        return {
          signedIn: true,
          requireVerification: false,
          user: user,
        };
      case SIGN_OUT:
        return {
          signedIn: false,
          requireVerification: false,
          user: null,
        };
      case SIGNIN_FAILED:
        return {
          signedIn: false,
          requireVerification: false,
          user: null,
        };
      case SIGNUP_EVENT:
        return {
          signedIn: true,
          requireVerification: false,
          user: user,
        };
      default:
        return state;
    }
  }

  useEffect(() => {
    const isToken = storage.getToken();
    const isAuthenticated = async () => {
      if (!isToken) {
        // if no token to check, cancel call
        setComplete(true);
        return;
      }
      const response = await call({ signal: abortController.signal });
      const user = response?.data;
      if (!user) {
        // failed case
        setComplete(true);
        // dispatch
        dispatch({ action: SIGNIN_FAILED });
        return;
      }
      // success case
      setComplete(true);
      // dispatch
      dispatch({
        action: SIGNIN_SUCCESS,
        user: user,
      });
    };

    // check auth
    isAuthenticated();

    // cleanup
    return () => {
      // cancel the request on unmount
      abortController.abort();
    };
  }, []);

  return (
    <Session.Provider value={{ state, dispatch }}>
      {complete ? children : <PageLoader />}
    </Session.Provider>
  );
};
