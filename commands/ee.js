COMMANDS.ee = {
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
    moreHelp: 'use  ee -h',
    usage: '[-f/--fuck|-h/--help|-u/--uwu|-v/--version|-s/-source|-b/--burn]'
}