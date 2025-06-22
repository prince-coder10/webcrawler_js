const { JSDOM } = require("jsdom");

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

function normalizeURL(urlStrring) {
  const url = new URL(urlStrring);
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
};
