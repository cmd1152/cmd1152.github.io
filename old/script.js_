

        const term = new Terminal({
            cursorStyle: 'block',
            cursorColor: '44ff00',
            cursorBlink: true,

        });
        const fitAddon = new FitAddon.FitAddon();
        term.loadAddon(fitAddon);
        term.open(document.getElementById('terminal'));
        fitAddon.fit();
        window.onresize = () => { fitAddon.fit(); }
        function calculateByteLength(str) {
            let byteLength = 0;
            for (let i = 0; i < str.length; i++) {
                if (str.charCodeAt(i) <= 127) {
                    byteLength += 1;
                } else {
                    byteLength += 2;
                }
            }
            return byteLength;
        }
        term.onData((data) => {
            function deltext() {
                let oldl = calculateByteLength(text);
                if (oldl == 0) return;
                text = text.slice(0, -1);
                pushMessage("[D [D", false);
                if (oldl > calculateByteLength(text) + 1) pushMessage(`[D [D`, false);
                if (text.length == 0) return;
                if (Math.floor(oldl / term.cols) == oldl / term.cols) {
                    pushMessage(`[A`, false);
                    pushMessage(`${Array(term.cols - 1).fill("[C").join("")} `, false);
                    pushMessage(`${Array(term.cols - 1).fill("[C").join("")}`, false);
                    pushMessage(`${(oldl > calculateByteLength(text) + 1) ? "[D [D" : ""}`, false)
                }
            }
            if (canType) {
                if (data.startsWith("")) {
                    if (data == "[A") {
                        commandindex += 1;
                        if (commandindex > commandhistory.length) commandindex = commandhistory.length;
                        function donea() {
                            text = commandhistory[commandhistory.length - commandindex] ? commandhistory[commandhistory.length - commandindex] : '';
                            pushMessage(`\r${text}`, false)
                        }
                        function nexta() {
                            deltext()
                            if (text == "") {
                                donea()
                            } else nexta()
                        }
                        nexta()
                    } else if (data == "[B") {
                        commandindex = Math.max(commandindex - 1, 0);
                        function doneb() {
                            text = commandhistory[commandhistory.length - commandindex] ? commandhistory[commandhistory.length - commandindex] : '';
                            pushMessage(`${text}`, false);
                        }
                        function nextb() {
                            deltext()
                            if (text == "") {
                                doneb()
                            } else nextb()
                        }
                        nextb()
                    }
                } else {
                    if (data == atob("DQ")) {
                        pushMessage('\x1b[0m');
                        (async () => {
                            cantype = false
                            let cmd = text.trim().split(" ");
                            if (text.trim() !== '') {
                                commandindex = 0
                                if (commandhistory[Math.max(commandhistory.length - 1, 0)] !== text) commandhistory.push(text)
                                if (COMMANDS[cmd[0]]) {
                                    let runcmd = cmd.shift();
                                    try {
                                        await COMMANDS[runcmd].run(cmd);
                                    } catch (err) {
                                        pushMessage(`\x1B[91mKernel error while executing command: ${err.message}\x1B[0m`)
                                    }
                                } else pushMessage("\x1B[37mUnknow Command.\x1B[0m")
                            }
                            text = "";
                            cantype = true
                            pushMessage("\x1b[92m", false)
                        })()
                    } else if (data == atob("fw")) {
                        deltext()
                    } else {
                        text += data
                        pushMessage(data, (Math.floor(calculateByteLength(text) / term.cols) == calculateByteLength(text) / term.cols))
                    }
                }
            }
        })
        setTimeout(() => {
            document.getElementsByClassName("xterm-char-measure-element")[0].style.display = 'none';
        }, 10)
        window.onerror = function (message, source, lineno, colno, error) {
            pushMessage("\x1B[91mAre u Toxic? an uncaught error occurred!\x1b[0m")
        };

        var commandhistory = [];
        var commandindex = 0;
        var canType = true
        var text = ""

        function getRandomItemFromArray(arr) {
            var randomIndex = Math.floor(Math.random() * arr.length);
            return arr[randomIndex];
        }
        var COMMANDS = {
            "help": {
                run: (args) => {
                    if (args[0]) {
                        if (COMMANDS[args[0]]) {
                            pushMessage(`\x1B[97m${args[0]}\x1B[0m`);
                            pushMessage("");
                            pushMessage(COMMANDS[args[0]]["moreHelp"]);
                            pushMessage("");
                            pushMessage(`Usage: ${args[0]} ${COMMANDS[args[0]].usage}`);
                        } else pushMessage("\x1B[37mUnknow Command.\x1B[0m")

                    } else {
                        for (let k in COMMANDS) {
                            pushMessage(` ${k}${Array(10 - k.length).fill(" ").join("")}${COMMANDS[k].help}`)
                        }
                        pushMessage("");
                        pushMessage("Use \x1B[37mhelp [command]\x1B[0m to show more help...");
                    }
                },
                help: 'Show help',
                moreHelp: 'Display a help list. If you know the command, you can display detailed help and usage for the corresponding command.',
                usage: '[command]'
            },
            "ee": {
                run: (args) => {
                    let runcmd = "err"
                    if (!args[0]) runcmd = "help"
                    switch (args[0]) {
                        case '-f':
                            runcmd = "fuck"
                            break;
                        case '--fuck':
                            runcmd = "fuck"
                            break;
                        case '-u':
                            runcmd = "uwu"
                            break;
                        case '--uwu':
                            runcmd = "uwu"
                            break;
                        case '-v':
                            runcmd = "ver"
                            break;
                        case '--version':
                            runcmd = "ver"
                            break;
                        case '-s':
                            runcmd = "sou"
                            break;
                        case '-source':
                            runcmd = "sou"
                            break;
                        case '-b':
                            runcmd = "burn"
                            break;
                        case '--burn':
                            runcmd = "burn"
                            break;
                        case '-h':
                            runcmd = "help"
                            break;
                        case '--help':
                            runcmd = "help"
                            break;
                    }
                    if (runcmd == "err") {
                        pushMessage("\x1B[91;1mUsage error\x1B[0m");
                        pushMessage("");
                        pushMessage("Paperee v1.0");
                        pushMessage("I'M PAPEREE");
                        pushMessage("");
                        pushMessage("        -f / --fuck     \x1B[5mFuck EE\x1B[0m Only a joke()");
                        pushMessage("        -h / --help     Print help");
                        pushMessage("        -u / --uwu      Print uwu");
                        pushMessage("        -v / --version  Print version");
                        pushMessage("        -s / -source    About source code and how to compile");
                        pushMessage("        -b / --burn     \x1B[5;91mBurn EE\x1B[0m");
                        pushMessage("");
                        pushMessage("Copyright (c) 2022-2023 Remelens");
                        pushMessage("All rights reserved");
                        runcmd == "help";
                    } else {
                        switch (runcmd) {
                            case 'fuck':
                                pushMessage("You are not EE uwu");
                                break;
                            case 'uwu':
                                pushMessage("Hi yo Administraor uwu!");
                                pushMessage("——Your cute helper uwu");
                                break;
                            case 'ver':
                                pushMessage("Paperee 1.0");
                                break;
                            case 'sou':
                                pushMessage("Paperee Source Code");
                                pushMessage("Path: /just/a/joke/ee.cpp");
                                pushMessage("Compile Command: sudo g++ ee.cpp -o /bin/ee -O2")
                                pushMessage("Support: libstdc++(ISO C++ 11)");
                                break;
                            case 'help':
                                pushMessage("Paperee v1.0");
                                pushMessage("I'M PAPEREE");
                                pushMessage("");
                                pushMessage("        -f / --fuck     \x1B[5mFuck EE\x1B[0m Only a joke()");
                                pushMessage("        -h / --help     Print help");
                                pushMessage("        -u / --uwu      Print uwu");
                                pushMessage("        -v / --version  Print version");
                                pushMessage("        -s / -source    About source code and how to compile");
                                pushMessage("        -b / --burn     \x1B[5;91mBurn EE\x1B[0m");
                                pushMessage("");
                                pushMessage("Copyright (c) 2022-2023 Remelens");
                                pushMessage("All rights reserved");

                                break;
                            case 'burn':
                                pushMessage("\x1B[1;91mBurning Paperee...\x1B[0m", true, true);
                                pushMessage("\x1B[1;91m🔥 📄\x1B[0m", true, true);

                                break;
                        }
                    }

                },
                help: 'Paperee',
                moreHelp: 'see  ee -h',
                usage: '[-f/--fuck|-h/--help|-u/--uwu|-v/--version|-s/-source|-b/--burn]'
            },
            "hc-status": {
                run: (args) => {
                    return new Promise(resolve => {
                        let ws = new WebSocket("wss://hack.chat/chat-ws");
                        pushMessage("Connect to Server...\r", false);
                        ws.onopen = () => {
                            ws.send(`{"cmd":"session","isBot":false}`);
                        }
                        ws.onmessage = (e) => {
                            var hc = JSON.parse(e.data);
                            if (hc.cmd == "session") {
                                pushMessage("--- HackChat status ---");
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
                            } else pushMessage(`\x1B[91mFailed to correctly obtain the status of hc: ${e.data}\x1B[0m`, true, true)
                            ws.close();
                            resolve();
                        }
                        ws.onerror = () => {
                            pushMessage(`\x1B[91mFailed to correctly obtain the status of hc: \x1B[0m\x1B[31mUnable to connect to server\x1B[0m`, true, true)
                            resolve();
                        }
                    });
                },
                help: 'Display partially public HC channel information',
                moreHelp: 'Connect to the WebSocket of HC and obtain the number of online users and channels of HC, as well as the number of online users of some public channels.',
                usage: ''
            },
            "notems": {
                run: (args) => {
                    return new Promise(resolve => {
                        let method = args[0];
                        let fetbody = null;
                        let fetthod = "GET";
                        let feturls = "/notems"
                        if (args[1]) {
                            feturls += `?${encodeURIComponent(args[1])}`
                            if (method.toLocaleLowerCase() == "set") {
                                fetbody = args
                                fetbody.shift();
                                fetbody.shift();
                                fetbody.join(" ");
                                fetthod = "POST"
                            } else if (method.toLocaleLowerCase() != "get") {
                                pushMessage("\x1B[91mUnknow Method\x1B[0m", true, true);
                                resolve();
                            }
                            fetch(feturls, {
                                "body": fetbody,
                                "method": fetthod,
                                "mode": "cors"
                            })
                                .then(response => {
                                    if (response.ok) {
                                        return response.text();
                                    } else {
                                        pushMessage("\x1B[91moperation failed:\x1B[0m", true, true);
                                        if (response.status == 429) {
                                            pushMessage("\x1B[91mOperation too fast\x1B[0m", true, true);
                                        } else pushMessage("\x1B[91mserver failed\x1B[0m", true, true);
                                        resolve();
                                    }
                                })
                                .then(e => {
                                    if (fetthod == "GET") {
                                        pushMessage(e)
                                    }
                                })
                                .finally(() => {
                                    resolve();
                                })
                        } else {
                            pushMessage("\x1B[91mUnknow path\x1B[0m", true, true);
                            resolve();
                        }
                    })
                },
                help: 'Read/Edit note.ms page',
                moreHelp: 'Read/Edit note.ms page',
                usage: '[set/get] [path] <text(allow space)>'
            },
            "cls": {
                run: () => {
                    term.clear()
                },
                help: 'clear screen',
                moreHelp: 'clear screen',
                usage: ''
            },
            "mouse": {
                run: () => {
                    var amouse = ["This mouse is still alive", "This mouse is biting the national defense optical cable", "This mouse is very lonely", "This mouse is wandering", "We gave this mouse a nickname - Adventurer", "This mouse may be able to replace a mouse", "No one knows which one will come first, tomorrow or the accident", "This mouse crashed to death on Earth", "Does he still remember fish", "Does he still stick to his original dream?", "His determination shattered to the ground", "123456 is a bad password", "He can make mistakes", "God won't bleed", "too funny", "He still needs to face reality", "<MrZhang365> go die", "What is the meaning of living", "He committed suicide"]
                    pushMessage("     _   _");
                    pushMessage("    (q\\_/p)");
                    pushMessage(".-.  |. .|");
                    pushMessage("   \\ =\\,/=");
                    pushMessage("    )/ _ \\  |\\");
                    pushMessage("   (/\\):(/\\  )\\");
                    pushMessage("    \\_   _/ |Oo\\");
                    pushMessage("    `\"\"^\"\"` `\"\"\"`");
                    pushMessage("");
                    pushMessage(`\x1B[3m${getRandomItemFromArray(amouse)}\x1B[0m`, true, true)
                },
                help: 'a onely mouse',
                moreHelp: 'run this command ,u can see a onely mouse. mouse@XChat',
                usage: ''
            }
        }
        function pushMessage(arg, enter = true) {
            term.write(`${arg}${enter ? "\n\r" : ""}`)
        }

        pushMessage("Melon Cmd [Ver 1.1.1152]");
        pushMessage("Copyright (c) 2024 Melon Cmd.  All rights reserved.");
        pushMessage("\x1b[92m");
