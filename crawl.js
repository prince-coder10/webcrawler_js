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
};
