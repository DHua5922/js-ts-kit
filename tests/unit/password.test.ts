import { Bcrypt } from "../../src/password";

describe("Bcrypt", () => {
  it("hashes a password using a generated salt", async () => {
    const genSalt = jest.fn().mockResolvedValue("salt");
    const hash = jest.fn().mockResolvedValue("hashed-value");
    const bcrypt = new Bcrypt({ genSalt, hash, compare: jest.fn() });

    await expect(bcrypt.hashPassword("secret", 12)).resolves.toBe(
      "hashed-value",
    );
    expect(genSalt).toHaveBeenCalledWith(12);
    expect(hash).toHaveBeenCalledWith("secret", "salt");
  });

  it("delegates password comparison", async () => {
    const compare = jest.fn().mockResolvedValue(true);
    const bcrypt = new Bcrypt({
      genSalt: jest.fn(),
      hash: jest.fn(),
      compare,
    });

    await expect(
      bcrypt.isMatchingPassword("hashed-password", "plain-password"),
    ).resolves.toBe(true);
    expect(compare).toHaveBeenCalledWith("plain-password", "hashed-password");
  });
});
