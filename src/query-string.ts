type QueryStringValue = string | string[];
type QueryStringObject = Record<string, QueryStringValue>;

function decodeQueryStringValue(value: string) {
  return decodeURIComponent(value.replace(/\+/g, " "));
}

function convertQueryStringToObject(queryString: string) {
  const parsedQueryString: QueryStringObject = {};

  for (const pair of queryString.split("&")) {
    if (!pair) continue;

    const separatorIndex = pair.indexOf("=");
    const rawKey = separatorIndex === -1 ? pair : pair.slice(0, separatorIndex);
    const rawValue =
      separatorIndex === -1 ? "" : pair.slice(separatorIndex + 1);

    let key = decodeURIComponent(rawKey);
    const value = decodeQueryStringValue(rawValue);

    if (key.slice(-2) === "[]") {
      key = key.slice(0, -2);

      if (!Array.isArray(parsedQueryString[key])) {
        parsedQueryString[key] = [];
      }

      (parsedQueryString[key] as string[]).push(value);
      continue;
    }

    if (Object.prototype.hasOwnProperty.call(parsedQueryString, key)) {
      if (!Array.isArray(parsedQueryString[key])) {
        parsedQueryString[key] = [parsedQueryString[key] as string];
      }

      (parsedQueryString[key] as string[]).push(value);
      continue;
    }

    parsedQueryString[key] = value;
  }

  return parsedQueryString;
}

export { convertQueryStringToObject };
export type { QueryStringObject, QueryStringValue };
