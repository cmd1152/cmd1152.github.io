let cmdindex = 0
let commands = ["help",`cat readme.txt`]
function typeStringAndRollback(inputStrings, rollbackFunction, finalFunction, timeInterval) {
    let index = 0;
    const intervalId = setInterval(() => {
        if (index < inputStrings.length) {
            const char = inputStrings[index];
            rollbackFunction(char);
            index++;
        } else {
            clearInterval(intervalId);
            if (finalFunction) {
                finalFunction();
            }
        }
    }, timeInterval);
}
function executeCommand() {
    canType = true
    sbline(atob("DQ"),false)
    cmdindex += 1
    if (commands[cmdindex]) {
        canType = false
        setTimeout(nextCommand,500)
    } else canType = true
}
function typeCommand(cmd) {
    canType = true
    sbline(cmd)
    canType = false
}
function nextCommand() {
    typeStringAndRollback(
        commands[cmdindex].split(""),
        typeCommand,
        executeCommand,
        20
    )
}
function cmdinit() {
    if (commands.length > 0 ) nextCommand()
}