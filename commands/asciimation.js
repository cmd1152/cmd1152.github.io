
COMMANDS.asciimation = {
    run: (args) => {
      return new Promise(resolve => {
        pushMessage("Loading resource files\r", false);
        fetch('/film.obj')
          .then(response => {
            if (!response.ok) {
              pushMessage('\x1B[91mFailed to load the resource\x1B[0m');
              resolve()
            }
            return response.text();
          })
          .then(data => {
            let glDatas = []
            let glDataSleep = []
            let glData = ''
            data.split("\n").forEach(lineData=>{
              if (parseInt(lineData) == lineData && parseInt(lineData) <= 70) { //别大的离谱，最多5秒
                glDataSleep.push(parseInt(lineData))
                glDatas.push(glData)
                glData = ''
              } else glData += `${lineData}\n`
            })
            glDatas.push(glData)
            glData = ''
            //全部准备就绪，清空控制台
            term.clear();
            let playIndex = 0
            let allms = 0
            let speed = parseFloat(args[0])?parseFloat(args[0]):1
            speed = speed>0.1?speed:0.1
            speed = speed>10?10:speed
            glDataSleep.forEach(dlData=>{
              allms += Math.max(Math.floor(dlData*100/speed),1)
            })
            let gallms = allms
            function nextPage() {
              if (glDatas[playIndex] != undefined && !isNaN(allms)) {
                if (term.cols < 68) {
                  term.clear()
                  term.write(`\x1B[2J\x1B[HThe page is not wide enough and will be displayed once you adjust the page width to a usable size.`)
                  setTimeout(nextPage,500)
                  return;
                }
                term.write(`\x1B[2J\x1B[H${Array(Math.floor((term.rows-13)/2)).fill("\n\r").join('')}${Array(Math.floor((term.cols-68)/2)).fill(" ").join('')}${glDatas[playIndex].split("\n").join(`\n\r${Array(Math.floor((term.cols-68)/2)).fill(" ").join('')}`)}[${Array(51-(Math.floor(allms/gallms*50))).fill("=").join('').padEnd(50,' ')}] ETA ${Math.floor(allms/1000)}s  ${speed}x`)
                playIndex += 1
                allms -= Math.max(Math.floor(glDataSleep[playIndex]*100/speed),1)
                setTimeout(nextPage,Math.max(Math.floor(glDataSleep[playIndex]*100/speed),1))
              } else {
                setTimeout(()=>{
                  term.clear()
                  term.write(`\x1B[2J\x1B[HWelcome back.`)
                  resolve()
                },3000)
              }
            }
            nextPage()
          })
          .catch(error => {
            pushMessage('\x1B[91mFailed to load the resource\x1B[0m');
            resolve()
          });
      })
    },
    help: 'telnet towel.blinkenlights.nl',
    moreHelp: 'telnet towel.blinkenlights.nl',
    usage: '<speed(Default 1)>'
}