import React from "react";
import ApiErrorCode from "./ApiErrorCode";
import BuildApiRequestStringCode from "./BuildApiRequestStringCode";
import CodeParent from "./Code";
import ConvertQueryStringToObjectCode from "./ConvertQueryStringToObjectCode";
import CookieExpireTimeCode from "./CookieExpireTimeCode";
import DefaultErrorCode from "./DefaultErrorCode";
import ParseCookieCode from "./ParseCookieCode";

interface CodeType extends React.FC<any> {
  CookieExpireTime: typeof CookieExpireTimeCode;
  DefaultError: typeof DefaultErrorCode;
  ApiError: typeof ApiErrorCode;
  ParseCookie: typeof ParseCookieCode;
  ConvertQueryStringToObject: typeof ConvertQueryStringToObjectCode;
  BuildApiRequestString: typeof BuildApiRequestStringCode;
}

const Code = CodeParent as unknown as CodeType;
Code.CookieExpireTime = CookieExpireTimeCode;
Code.DefaultError = DefaultErrorCode;
Code.ApiError = ApiErrorCode;
Code.ParseCookie = ParseCookieCode;
Code.ConvertQueryStringToObject = ConvertQueryStringToObjectCode;
Code.BuildApiRequestString = BuildApiRequestStringCode;

export default Code;
