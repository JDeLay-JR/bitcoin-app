const socket = new WebSocket("wss://ws.blockchain.info/inv");

socket.addEventListener('open', (evt) => {
    socket.send(JSON.stringify({
        "op": "ping"
    }))
})

socket.addEventListener('message', (evt) => {
    console.log('Message from server ', evt.data);
});

export default socket