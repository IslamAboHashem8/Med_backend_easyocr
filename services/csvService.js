const fs = require("fs");
const csv = require("csv-parser");

const caches = {};

function readCSV(csvPath) {
  return new Promise((resolve, reject) => {

    // لو الملف ده اتحمل قبل كده، رجّع الـ cache بتاعه
    if (caches[csvPath]) {
      return resolve(caches[csvPath]);
    }

    const results = [];

    fs.createReadStream(csvPath)
      .pipe(csv())
      .on("data", (row) => results.push(row))
      .on("end", () => {
        caches[csvPath] = results;
        console.log(`Cache loaded: ${csvPath} (${results.length} rows)`);
        resolve(caches[csvPath]);
      })
      .on("error", reject);
  });
}

module.exports = { readCSV };