const { normalizeURL, getURLsFromHTML } = require("./crawl.js");
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

test("get urls from HTML", () => {
  const inputHTMLBody = `
  <html> 
    <body>
        <a href="https://github.com/path">Github page</a>
    </body>
  </html>  
  `;
  const inputBaseURL = "https://github.com/path";
  const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
  const expected = ["https://github.com/path"];
  expect(actual).toEqual(expected);
});

test("get urls from HTML relative", () => {
  const inputHTMLBody = `
    <html> 
      <body>
          <a href="/path/">Github page</a>
      </body>
    </html>  
    `;
  const inputBaseURL = "https://github.com";
  const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
  const expected = ["https://github.com/path"];
  expect(actual).toEqual(expected);
});

test("get multiple urls from HTML relative", () => {
  const inputHTMLBody = `
      <html> 
        <body>
            <a href="https://github.com/path1/">Github page</a>
            <a href="/path2/">Github page2</a>

        </body>
      </html>  
      `;
  const inputBaseURL = "https://github.com";
  const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
  const expected = ["https://github.com/path1", "https://github.com/path2"];
  expect(actual).toEqual(expected);
});

test("handling bad urls", () => {
  const inputHTMLBody = `
      <html> 
        <body>
            <a href="invalid">invalid url</a>
        </body>
      </html>  
      `;
  const inputBaseURL = "https://github.com";
  const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
  const expected = [];
  expect(actual).toEqual(expected);
});
