import axios from "axios";
import Code from "./Code";
import { ApiError, DefaultError } from "js-ts-kit";
import { useState } from "react";

const code = `
function Example() {
    const [statusCode, setStatusCode] = useState(0);
    const [error, setError] = useState("");

    async function getApiData() {
        let error = null;

        try {
            await axios({
                url: "http://localhost:8080",
                method: "get"
            });
        } catch (err) {
            console.error(err);

            error = new ApiError(DefaultError.message(err), 500);
            if (ApiError.isApiError(err)) {
                error = new ApiError(ApiError.default(err), err.response.status);
            }
        }

        setStatusCode(error.status)
        setError(error ? error.message : "");
    }

    getApiData();
    
    return (
      <>
        <b>Status:</b> {statusCode}<br/>
        <b>Message:</b> {error}
      </>
    );
}
`;

function ApiErrorCode(props) {
  return (
    <Code scope={{ ApiError, DefaultError, axios, useState }} {...props}>
      {code}
    </Code>
  );
}

export default ApiErrorCode;
