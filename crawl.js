const { JSDOM } = require("jsdom");

async function crawlPage(baseURL, currentURL, pages) {
  const baseURLObj = new URL(baseURL);
  const currentURLObj = new URL(currentURL);

  if (baseURLObj.hostname !== currentURLObj.hostname) {
    return pages;
  }

  const normalizedCurrentUrl = normalizeURL(currentURL);
  if (pages[normalizedCurrentUrl] > 0) {
    pages[normalizedCurrentUrl]++;
    return pages;
  }

  pages[normalizedCurrentUrl] = 1;
  console.log(`actively crawling ${currentURL}`);

  try {
    const resp = await fetch(currentURL);
    if (resp.status > 399) {
      console.log(
        "error in fetch with status code :",
        resp.status,
        "on page",
        currentURL
      );
      return pages;
    }

    const contentType = resp.headers.get("Content-Type");
    if (!contentType.includes("text/html")) {
      console.log("non html response:", contentType, "on page", currentURL);
      return pages;
    }

    const htmlBody = await resp.text();
    const nextUrls = getURLsFromHTML(htmlBody, baseURL);
    for (const nextUrl of nextUrls) {
      pages = await crawlPage(baseURL, nextUrl, pages);
    }
  } catch (err) {
    console.log("error in fetch:", err.message, "on page", currentURL);
  }
  return pages;
}

function getURLsFromHTML(htmlBody, baseURL) {
  const urls = [];
  const dom = new JSDOM(htmlBody);
  const linkElements = dom.window.document.querySelectorAll("a");

  for (const linkElement of linkElements) {
    const href = linkElement.getAttribute("href");

    if (!href) continue; // skip null or empty href

    try {
      if (!href.startsWith("/") && !href.includes("https")) {
      } else {
        // ✅ Try to construct a URL relative to the base
        const urlObj = new URL(href, baseURL);
        let finalURL = urlObj.href;

        // ✅ Remove trailing slash (if not root "/")
        if (finalURL.endsWith("/") && finalURL.length > 1) {
          finalURL = finalURL.slice(0, -1);
        }

        urls.push(finalURL);
      }
    } catch (err) {
      // 🔥 Invalid URL format (like "javascript:void(0)")
      console.warn(`Skipping invalid URL: "${href}" - ${err.message}`);
    }
  }

  return urls;
}

function normalizeURL(urlString) {
  const url = new URL(urlString);
  let normalURL = `${url.hostname}${url.pathname}`;
  if (normalURL.length > 0 && normalURL.includes("www.")) {
    normalURL = normalURL.slice(4); // Remove 'www.'
  }
  if (normalURL.length > 0 && normalURL.slice(-1) === "/") {
    normalURL = normalURL.slice(0, -1);
  }
  return normalURL;
}

module.exports = {
  normalizeURL,
  getURLsFromHTML,
  crawlPage,
};
