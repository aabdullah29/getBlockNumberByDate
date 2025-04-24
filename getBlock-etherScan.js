// getBlocksByDate.js

const axios = require("axios");
const moment = require("moment");

/**
 * Fetch the nearest block number to a given UNIX timestamp.
 *
 * @param {number} timestamp  Seconds since epoch
 * @param {"before"|"after"} closest
 * @param {string} apiKey    Your Etherscan API key
 * @returns {Promise<number>}
 */
async function getBlockByTimestamp(timestamp, closest, apiKey) {
  const url = "https://api.etherscan.io/api";
  const params = {
    module: "block",
    action: "getblocknobytime",
    timestamp: timestamp,
    closest: closest,
    apikey: apiKey,
  };

  const resp = await axios.get(url, { params });
  if (resp.data.status !== "1") {
    throw new Error(`Etherscan API error: ${resp.data.message}`);
  }
  return Number(resp.data.result);
}

/**
 * Given a date string (YYYY-MM-DD), returns the start and end block numbers.
 *
 * @param {string} dateString  e.g. "2020-01-10"
 * @param {string} apiKey      Your Etherscan API key
 */
async function getBlocksForDate(startDateString, endDateString, apiKey) {
  // Parse date in UTC
  const startTime = moment.utc(startDateString, "YYYY-MM-DD").startOf("day");
  const endTime = moment.utc(endDateString, "YYYY-MM-DD").endOf("day");

  const startTs = startTime.unix();
  const endTs = endTime.unix();

  console.log(`Date: ${startDateString} to ${endDateString} (UTC)`);
  console.log(`Start timestamp: ${startTime.format()} (${startTs})`);
  console.log(`End   timestamp: ${endTime.format()} (${endTs})\n`);

  // 1) For the starting block, use closest=after so we get the
  //    first block *at or after* 00:00:00 UTC
  const startBlock = await getBlockByTimestamp(startTs, "after", apiKey);

  // 2) For the ending block, use closest=before so we get the
  //    last block *at or before* 23:59:59 UTC
  const endBlock = await getBlockByTimestamp(endTs, "before", apiKey);

  return { startBlock, endBlock };
}

// ---------------
// Example usage:
// ---------------

(async () => {
  // Your Etherscan API key
  const apiKey = "";
  const startDate = "2025-1-1";
  const endDate = "2025-1-31";
  try {
    console.log(startDate)
    if (!startDate || !endDate || !apiKey) {
      console.error("Usage: node getBlocksByDate.js <YYYY-MM-DD> <YourApiKeyToken>");
      process.exit(1);
    }

    const { startBlock, endBlock } = await getBlocksForDate(startDate, endDate, apiKey);
    console.log(`Starting block for ${startDate}: ${startBlock}`);
    console.log(`Ending   block for ${endDate}: ${endBlock}`);
  } catch (err) {
    console.error("Error:", err.message);
    process.exit(1);
  }
})();
