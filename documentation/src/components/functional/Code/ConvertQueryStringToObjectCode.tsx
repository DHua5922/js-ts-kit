import Code from "./Code";
import { convertQueryStringToObject } from "js-ts-kit";

const code = `
function Example() {
    const queryString = "name=John&color=blue";
    return <>{JSON.stringify(convertQueryStringToObject(queryString), null, 4)}</>;
}
`;

function ConvertQueryStringToObjectCode(props) {
  return (
    <Code scope={{ convertQueryStringToObject }} {...props}>
      {code}
    </Code>
  );
}

export default ConvertQueryStringToObjectCode;
