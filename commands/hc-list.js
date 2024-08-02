COMMANDS["hc-list"] = {
    run: (args) => {
        return new Promise(resolve => {
            if (!args[0]) {
                pushMessage("\x1B[91mYou did not specify a channel!\x1B[91m")
                resolve()
            }
            let ws = new WebSocket("wss://hack.chat/chat-ws");
            pushMessage("Connecting to server...\r", false);
            ws.onopen = () => {
                ws.send(JSON.stringify({
                    cmd: 'join',
                    channel: args[0],
                    nick: `list${Math.floor(Math.random()*999999-100000)+100000}${args[1]?"#" + args[1]:""}`
                }));
            }
            ws.onmessage = (e) => {
                var hc = JSON.parse(e.data);
                if (hc.cmd == "onlineSet") {
                    pushMessage(`HackChat ?${hc.channel} Online Users:`);
                    let waitshow = []
                    hc.users.forEach(user=>{
                      waitshow.push(`${user.trip?"["+user.trip+"]":""}${user.nick}`);
                    })
                    waitshow.pop()
                    pushMessage(waitshow.join(", "))
                }
                if (hc.cmd == "warn") {
                    if (hc.text.includes("rate-limited") || hc.text.includes("too fast")) {
                        pushMessage(`\x1B[91mThe operation is too fast. One IP can perform this operation up to 2 times in a minute\x1B[0m`, true, true)
                    } else if (hc.text.includes("be locked out from")) {
                        pushMessage(`\x1B[91mThe specified channel is locked. Please use \x1B[37mhc-list [channel] [password]\x1B[91m to join, where password is the password for authtrip\x1B[0m`, true, true)
                    } else {
                        pushMessage(`\x1B[91mUnknown Error\x1B[0m`, true, true)
                    }
                }
                if (hc.cmd == "info" && hc.text.includes("denied access")) {
                    pushMessage(`\x1B[91mThe specified channel is locked. Please use \x1B[37mhc-list [channel] [password]\x1B[91m to join, where password is the password for authtrip\x1B[0m`, true, true)
                }
                ws.close();
                resolve();
            }
            ws.onerror = () => {
                pushMessage(`\x1B[91mUnable to connect to server\x1B[0m`, true, true)
                resolve();
            }
        });
    },
    help: 'Show HC Online Users for specified HC channel',
    moreHelp: 'Connect to HC through WebSocket and list online users for specified HC channel',
    usage: '[channel] <authpassword>'
}