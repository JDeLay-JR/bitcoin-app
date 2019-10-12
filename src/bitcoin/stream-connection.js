/* eslint-disable no-console */
const socket = new WebSocket("wss://ws.blockchain.info/inv");

// Wait for connection to be established
socket.addEventListener('open', () => {
    console.log('Connected to Bitcoin stream')
    socket.send(JSON.stringify({
        "op": "unconfirmed_sub"
    }))
})

export default socket