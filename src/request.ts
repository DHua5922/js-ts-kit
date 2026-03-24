type RequestHeaders = Record<string, string>;

function buildApiRequestString(
  method: string,
  url: string,
  headers: RequestHeaders,
  body: string,
) {
  const requestLines = [`${method} ${url}`];

  for (const key in headers) {
    if (!Object.prototype.hasOwnProperty.call(headers, key)) continue;

    requestLines.push(`${key}: ${headers[key]}`);
  }

  if (body) {
    requestLines.push("", body);
  }

  return requestLines.join("\n");
}

export { buildApiRequestString };
export type { RequestHeaders };
