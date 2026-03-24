export type QueryStringValue = string | string[];
export type QueryStringObject = Record<string, QueryStringValue>;

export function convertQueryStringToObject(
  queryString: string,
): QueryStringObject;
