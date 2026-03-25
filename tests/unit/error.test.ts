import { ApiError, DatabaseError, DefaultError } from "../../src/error";

describe("DefaultError", () => {
  it("extracts and trims string messages", () => {
    expect(DefaultError.message("  failed  ")).toBe("failed");
  });

  it("extracts a message from an error-like object", () => {
    expect(DefaultError.message({ message: " broken " })).toBe("broken");
  });
});

describe("DatabaseError", () => {
  it("detects sequelize errors", () => {
    expect(
      DatabaseError.isSequelizeError({ name: "SequelizeDatabaseError" }),
    ).toBe(true);
    expect(DatabaseError.isSequelizeError({ parent: {} })).toBe(true);
    expect(DatabaseError.isSequelizeError("plain error")).toBe(false);
  });

  it("joins parent and nested sequelize error messages", () => {
    expect(
      DatabaseError.sequelize({
        parent: {
          message: "Statement failed",
          errors: [{ message: "Bad column" }, "Timeout"],
        },
      }),
    ).toBe("Statement failed\n\nBad column\n\nTimeout");
  });
});

describe("ApiError", () => {
  it("detects API errors from a response object", () => {
    expect(ApiError.isApiError({ response: { data: "bad" } })).toBe(true);
    expect(ApiError.isApiError(new Error("bad"))).toBe(false);
  });

  it("prefers exceptionMessage, then message, then raw string response data", () => {
    expect(
      ApiError.default({
        response: {
          data: {
            exceptionMessage: "First choice",
            message: "Second choice",
          },
        },
      }),
    ).toBe("First choice");

    expect(
      ApiError.default({
        response: {
          data: {
            message: "Fallback message",
          },
        },
      }),
    ).toBe("Fallback message");

    expect(
      ApiError.default({
        response: {
          data: "String response",
        },
      }),
    ).toBe("String response");
  });
});
