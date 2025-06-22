function printReport(pages) {
  console.log("============");
  console.log("REPORT");
  console.log("============");
  const sortedPages = sortPages(pages);
  for (const page of sortedPages) {
    const url = page[0];
    const hits = page[1];

    console.log(`found ${hits} links to ${url}`);
  }
  console.log("============");
  console.log("REPORT ENDS");
  console.log("============");
}

function sortPages(pages) {
  const pagesArray = Object.entries(pages);
  pagesArray.sort((a, b) => b[1] - a[1]); // ascending sort
  return pagesArray;
}

module.exports = {
  sortPages,
  printReport,
};
