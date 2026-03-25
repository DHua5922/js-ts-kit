import { JwtToken } from "../../src/token";

describe("JwtToken", () => {
  it("creates tokens without forwarding iat and exp to the payload", () => {
    const sign = jest.fn().mockReturnValue("signed-token");
    const verify = jest.fn();
    const token = new JwtToken({ sign, verify }, "secret");

    expect(
      token.create(
        {
          userId: 10,
          role: "admin",
          iat: 1,
          exp: 2,
        },
        { issuer: "js-ts-kit" },
      ),
    ).toBe("signed-token");

    expect(sign).toHaveBeenCalledWith(
      { userId: 10, role: "admin" },
      "secret",
      { issuer: "js-ts-kit" },
    );
  });

  it("delegates token verification", () => {
    const verify = jest.fn().mockReturnValue({ userId: 10 });
    const token = new JwtToken({ sign: jest.fn(), verify }, "secret");

    expect(token.decode("encoded-token", { audience: "web" })).toEqual({
      userId: 10,
    });
    expect(verify).toHaveBeenCalledWith("encoded-token", "secret", {
      audience: "web",
    });
  });
});
