import React from "react";
import {
  cookieExpireTime,
  parseCookie,
  ApiError,
  DefaultError,
  convertQueryStringToObject,
  buildApiRequestString,
  Bcrypt,
} from "js-ts-kit";
import axios from "axios";

// Add react-live imports you need here
const ReactLiveScope: unknown = {
  React,
  ...React,
  cookieExpireTime,
  parseCookie,
  ApiError,
  DefaultError,
  convertQueryStringToObject,
  buildApiRequestString,
  axios,
};

export default ReactLiveScope;
