import Code from "./Code";
import { buildApiRequestString } from "js-ts-kit";

const code = `
function Example() {
    return (
        <>
            {buildApiRequestString(
                "POST",
                "http://localhost:8080",
                {
                  "Content-Type": "application/json",
                  authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiaWQiOjEsImlhdCI6MTUxNjIzOTAyMn0.qbkPu51ruczq9jWaoHR6jDbyU6q06QZoSVX98zboWvg"
                },
                JSON.stringify({ email: "email", password: "password" })
            )}
        </>
    );
}
`;

function BuildApiRequestStringCode(props) {
  return (
    <Code scope={{ buildApiRequestString }} {...props}>
      {code}
    </Code>
  );
}

export default BuildApiRequestStringCode;
