const { normalizeURL } = require("./crawl.js");
const { test, expect } = require("@jest/globals");

test("Removing the protocol from a url", () => {
  const input = "https://github.com/path";
  const actual = normalizeURL(input);
  const expected = "github.com/path";
  expect(actual).toEqual(expected);
});

test("Removing the protocol and trailing slashes from a url", () => {
  const input = "https://github.com/path/";
  const actual = normalizeURL(input);
  const expected = "github.com/path";
  expect(actual).toEqual(expected);
});

test("Removing capitals from a url", () => {
  const input = "https://GITHUB.com";
  const actual = normalizeURL(input);
  const expected = "github.com";
  expect(actual).toEqual(expected);
});
