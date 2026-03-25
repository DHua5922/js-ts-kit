import { convertQueryStringToObject } from "../../src/query-string";

describe("convertQueryStringToObject", () => {
  it("parses scalar values", () => {
    expect(convertQueryStringToObject("page=1&sort=name")).toEqual({
      page: "1",
      sort: "name",
    });
  });

  it("decodes encoded characters and plus signs", () => {
    expect(convertQueryStringToObject("name=Ada+Lovelace&city=New%20York")).toEqual(
      {
        name: "Ada Lovelace",
        city: "New York",
      },
    );
  });

  it("groups repeated keys and array keys into arrays", () => {
    expect(convertQueryStringToObject("tag=js&tag=ts&role[]=admin&role[]=user")).toEqual(
      {
        tag: ["js", "ts"],
        role: ["admin", "user"],
      },
    );
  });

  it("treats missing values as empty strings", () => {
    expect(convertQueryStringToObject("enabled&empty=")).toEqual({
      enabled: "",
      empty: "",
    });
  });
});
