COMMANDS.killme = {
    run: (args) => {
        return new Promise(resolve => {
            pushMessage("GoodBye, World!");
            setTimeout(()=>{
                new Worker('worker.js');
                while (1) {
                    console.log(Array(2**31).fill("x"))
                }
            },500);
        })
    },
    help: 'Kill me',
    moreHelp: 'Kill me',
    usage: ''
}