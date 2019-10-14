# Bit Rain: A Bitcoin Transaction Monitor

## Description

This application connects to the [Blockchain WebSocket API](https://www.blockchain.com/api/api_websocket) and renders a "rain drop" for each transaction and block created since the user opened the site. There is also a ticker to keep track of the total number of transactions and blocks created during that time period.

## Development & Local Testing

`npm install && npm run start`

## Future Goals

Create a clean-up mechanism to remove the Rain Drop components that are no longer visible on the screen to avoid any memory leak/performance issues.

Tweak the Details component to be mobile-friendly.

Add a "most valuable transaction/block" feature to monitor the most valuable transaction/block that was created during the time a user was monitoring the blockchain stream.

Allow a user to click into a falling transaction/block and open a side panel with details about that transaction/block.

Pull in additional Bitcoin analytics (current BTC to USD conversion, current number of Bitcoins in the world, etc)
