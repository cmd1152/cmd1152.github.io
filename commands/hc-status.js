COMMANDS["hc-status"] = {
    run: (args) => {
        return new Promise(resolve => {
            let ws = new WebSocket("wss://hack.chat/chat-ws");
            pushMessage("Connecting to server...\r", false);
            ws.onopen = () => {
                ws.send(`{"cmd":"session","isBot":false}`);
            }
            ws.onmessage = (e) => {
                var hc = JSON.parse(e.data);
                if (hc.cmd == "session") {
                    pushMessage("--- HackChatStatus ---");
                    pushMessage("");
                    pushMessage("+--------------------+");
                    pushMessage("| Channel     | User |");
                    pushMessage("+--------------------+")
                    for (let k in hc.public) {
                        pushMessage(`| ${k}${Array(12 - k.length).fill(" ").join("")}| ${hc.public[k].toString()}${Array(5 - hc.public[k].toString().length).fill(" ").join("")}|`, true, true)
                    }
                    pushMessage("+--------------------+");
                    pushMessage("");
                    pushMessage(`Online Users: ${hc.users.toString()}`);
                    pushMessage(`Online Channels: ${hc.chans.toString()}`);
                } else if (hc.text.includes("rate-limited") || hc.text.includes("too fast")) {
                    pushMessage(`\x1B[91mThe operation is too fast.\x1B[0m`, true, true)
                } else pushMessage(`\x1B[91mUnable to understand: ${e.data}\x1B[0m`, true, true)
                ws.close();
                resolve();
            }
            ws.onerror = () => {
                pushMessage(`\x1B[91mUnable to connect to server\x1B[0m`, true, true)
                resolve();
            }
        });
    },
    help: 'Show HC status',
    moreHelp: 'Connect to HC through WebSocket and list HC information using session packets',
    usage: ''
}