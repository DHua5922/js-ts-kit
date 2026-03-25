import { buildApiRequestString } from "../../src/request";

describe("buildApiRequestString", () => {
  it("builds a request string with headers and body", () => {
    expect(
      buildApiRequestString(
        "POST",
        "/users",
        {
          "Content-Type": "application/json",
          Authorization: "Bearer token",
        },
        '{"name":"Ada"}',
      ),
    ).toBe(
      'POST /users\nContent-Type: application/json\nAuthorization: Bearer token\n\n{"name":"Ada"}',
    );
  });

  it("omits the body separator when the body is empty", () => {
    expect(buildApiRequestString("GET", "/health", {}, "")).toBe(
      "GET /health",
    );
  });
});
