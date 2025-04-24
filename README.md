## getBlock-etherScan.js

A Node.js script retrieves the starting and ending Ethereum block numbers for a given UTC date by querying the Etherscan API endpoint `getblocknobytime`.

### Features

- Fetch the first block at or after 00:00:00 UTC of a specified date
- Fetch the last block at or before 23:59:59 UTC of a specified date
- Uses `axios` for HTTP requests and `moment` for date handling

### Prerequisites

- Node.js v12 or higher
- An Etherscan API key (free to register at https://etherscan.io/apis)

### Installation

1. Clone or download this repository.
2. Install dependencies:
   ```
   npm install
   ```

### Usage

Run the script with three arguments: the start date, end date in `YYYY-MM-DD` format and your Etherscan API key.

```
node script/getBlock-etherScan.js
```



