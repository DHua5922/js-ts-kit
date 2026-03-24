export type RequestHeaders = Record<string, string>;

export function buildApiRequestString(
  method: string,
  url: string,
  headers: RequestHeaders,
  body: string,
): string;
