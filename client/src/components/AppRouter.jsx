import React, { useEffect, useState } from "react";
import { AuthRouter, router, LoadingRoute } from "../router/Router";
import { RouterProvider } from "react-router-dom";
import Cookies from "js-cookie";
import AuthService from "../service/AuthService";
import { useDispatch } from "react-redux";
import { LOGIN } from "../redux/actions/AuthActions";
import ReactGA from "react-ga4";

export const AppRouter = () => {
  ReactGA.initialize(import.meta.env.VITE_TRACKING_ID);
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  const checkToken = async () => {
    try {
      const token = Cookies.get("token");
      if (!token) return;
      const res = await AuthService.checkToken();
      if (res.status != 200) {
        Cookies.remove("token");
        return;
      }
      setIsAuth(true);
      dispatch({ type: LOGIN, payload: res });
      Cookies.set("token", res.data.token);
      setIsLoading(false);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  const loadData = async () => {
    try {
      const settings = await AuthService.getSettings();
      dispatch({ type: "GET_SETTINGS", payload: settings });
    } catch (e) {}
  };

  useEffect(() => {
    loadData();
    checkToken();
    // ReactGA.pageview(window.location.pathname + window.location.search);
    ReactGA.send({
      hitType: "pageview",
      page: window.location.pathname + window.location.search,
      title: "page",
    });
  }, []);

  if (isLoading) return <RouterProvider router={LoadingRoute} />;
  if (isAuth) return <RouterProvider router={AuthRouter} />;
  return <RouterProvider router={router} />;
};
