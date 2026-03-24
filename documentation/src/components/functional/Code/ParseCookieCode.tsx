import Code from "./Code";
import { parseCookie } from "js-ts-kit";

const code = `
function Example() {
    const cookieString = "accessToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IndldGFpclRlc3RAY2Zicy11cy5jb20iLCJpYXQiOjE2Njg1NTAzNDMsImV4cCI6MTY2ODU1MTU3N30.A1Kg-1nUcGHcaxCrffhvl9O_r3ruumjOExpcTrm0WlM; refreshToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InByb1JNUEF2aWF0aW9uQGNmYnMtdXMuY29tIiwiaWF0IjoxNjk2ODc0Mzg0LCJleHAiOjE2OTY4NzU2MTh9.9AgPEvfwWbS5UzZckwsoF98Hkmgxn-Dq0JETf4SAQfQ; token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImRodWFAY2Zicy11cy5jb20iLCJlbWFpbCI6ImRodWFAY2Zicy11cy5jb20iLCJpYXQiOjE3MTcxODQ3MzgsImV4cCI6MTcxNzI3MTEzOH0.WeDDi3pc4ZSkwHrno4Wb-ftrCKXqBsJRfpVBZRYrdoo";
    return <>{JSON.stringify(parseCookie(cookieString), null, 4)}</>;
}
`;

function ParseCookieCode(props) {
  return (
    <Code scope={{ parseCookie }} {...props}>
      {code}
    </Code>
  );
}

export default ParseCookieCode;
