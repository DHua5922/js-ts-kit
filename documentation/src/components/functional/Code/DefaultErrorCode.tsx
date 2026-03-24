import Code from "./Code";
import { DefaultError } from "js-ts-kit";

const code = `
function Example() {
    let error = "";

    try {
        throw new Error("This is a test error message");
    } catch (err) {
        console.error(err);

        error = DefaultError.message(err);
    }
    
    return error;
}
`;

function DefaultErrorCode(props) {
  return (
    <Code scope={{ DefaultError }} {...props}>
      {code}
    </Code>
  );
}

export default DefaultErrorCode;
