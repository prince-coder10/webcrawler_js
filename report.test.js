const { sortPages } = require("./report.js");
const { test, expect } = require("@jest/globals");

test("sortPages", () => {
  const input = {
    "https://wagslane.dev/path": 1,
    "https://wagslane.dev": 3,
  };
  const actual = sortPages(input);
  const expected = [
    ["https://wagslane.dev", 3],
    ["https://wagslane.dev/path", 1],
  ];
  expect(actual).toEqual(expected);
});

test("sort 4 Pages", () => {
  const input = {
    "https://wagslane.dev/path": 1,
    "https://wagslane.dev/path2": 3,
    "https://wagslane.dev/path3": 4,
    "https://wagslane.dev": 12,
  };
  const actual = sortPages(input);
  const expected = [
    ["https://wagslane.dev", 12],
    ["https://wagslane.dev/path3", 4],
    ["https://wagslane.dev/path2", 3],
    ["https://wagslane.dev/path", 1],
  ];
  expect(actual).toEqual(expected);
});
