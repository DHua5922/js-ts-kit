import { cookieExpireTime, parseCookie } from "../../src/cookie";

describe("parseCookie", () => {
  it("parses cookie pairs into an object", () => {
    expect(parseCookie("theme=dark; session=abc123")).toEqual({
      theme: "dark",
      session: "abc123",
    });
  });

  it("ignores empty and malformed cookie parts", () => {
    expect(parseCookie("theme=dark; ; invalid; mode=compact")).toEqual({
      theme: "dark",
      mode: "compact",
    });
  });

  it("keeps everything after the first equals sign in the value", () => {
    expect(parseCookie("token=a=b=c")).toEqual({
      token: "a=b=c",
    });
  });
});

describe("cookieExpireTime", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("adds the parsed duration to the current time", () => {
    jest.spyOn(Date, "now").mockReturnValue(1_000);

    expect(cookieExpireTime("2h")).toEqual(new Date(7_201_000));
  });

  it("returns the current time when the duration is invalid", () => {
    jest.spyOn(Date, "now").mockReturnValue(5_000);

    expect(cookieExpireTime("bad-value")).toEqual(new Date(5_000));
  });
});
