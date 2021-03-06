import { urlToList } from "../_utils/pathTools";
import { getFlatMenuKeys, getMeunMatchKeys } from "./SiderMenu";

const menu = [
  {
    path: "/dashboard",
    children: [
      {
        path: "/dashboard/name"
      }
    ]
  },
  {
    path: "/userinfo",
    children: [
      {
        path: "/userinfo/:id",
        children: [
          {
            path: "/userinfo/:id/info"
          }
        ]
      }
    ]
  }
];

const flatMenuKeys = getFlatMenuKeys(menu);

describe("test convert tree structure menu paths to flat menu paths", () => {
  it("simple menu", () => {
    expect(flatMenuKeys).toEqual([
      "/dashboard",
      "/dashboard/name",
      "/userinfo",
      "/userinfo/:id",
      "/userinfo/:id/info"
    ]);
  });
});

describe("test menu match", () => {
  it("simple path", () => {
    expect(
      getMeunMatchKeys(flatMenuKeys, urlToList("/dashboard"), true)
    ).toEqual(["/dashboard"]);
  });

  it("error path", () => {
    expect(
      getMeunMatchKeys(flatMenuKeys, urlToList("/dashboardname"), true)
    ).toEqual([]);
  });

  it("Secondary path", () => {
    expect(
      getMeunMatchKeys(flatMenuKeys, urlToList("/dashboard/name"), true)
    ).toEqual(["/dashboard", "/dashboard/name"]);
  });

  it("Parameter path", () => {
    expect(
      getMeunMatchKeys(flatMenuKeys, urlToList("/userinfo/2144"), true)
    ).toEqual(["/userinfo", "/userinfo/:id"]);
  });

  it("three parameter path", () => {
    expect(
      getMeunMatchKeys(flatMenuKeys, urlToList("/userinfo/2144/info"), false)
    ).toEqual(["/userinfo", "/userinfo/:id", "/userinfo/:id/info"]);
  });
});
