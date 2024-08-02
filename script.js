fetch('commands.txt')
  .then(response => {
    if (!response.ok) {
      window.dispatchEvent(new ErrorEvent('error', {
        message: 'Unable to load command'
      }));
    }
    return response.text();
  })
  .then(text => {
    const commandNames = text.split('\n').map(name => name.trim());
    commandNames.forEach(name => {
      const script = document.createElement('script');
      script.src = `commands/${name}.js`;
      document.head.appendChild(script);
    });
  })
  .catch(error => {
    window.dispatchEvent(new ErrorEvent('error', {
      message: 'Unable to load command'
    }));
  });

function reload(message) {
  infoDiv.innerText = message;
  document.getElementById('terminal').style.opacity = 0;
  loadpage.style.display = "flex";
  setTimeout(()=>{
    loadpage.style.opacity = 1;
    document.getElementById('terminal').style.display = "none";
  }, 500)
  setTimeout(()=>{
    infoDiv.innerText = "Overload All";
    setTimeout(()=>{location.reload()},1000);
  }, 3000);
}
window.addEventListener('error', function(event) {
  const message = event.message || 'Unknown error';
  reload('Core Error: ' + message)
});

const term = new Terminal({
  cursorStyle: 'block',
  cursorColor: '44ff00',
  cursorBlink: true,
});
const fitAddon = new FitAddon.FitAddon();
term.loadAddon(fitAddon);
term.open(document.getElementById('terminal'));
fitAddon.fit();
window.onresize = () => { 
  fitAddon.fit(); 
  try {
    if (text && canType) {
      text = "";
      pushMessage("\n\r\x1B[91mChanging the window size during input is not advisable\x1b[92m")
    }
  } catch (e) {}
}

        function getRandomItemFromArray(arr) {
            var randomIndex = Math.floor(Math.random() * arr.length);
            return arr[randomIndex];
        }
        function pushMessage(arg, enter = true) {
            term.write(`${arg}${enter ? "\n\r" : ""}`)
        }
var COMMANDS = {}
function pushMessage(arg, enter = true) {
  term.write(`${arg}${enter ? "\n\r" : ""}`)
}


    if ((new URLSearchParams(window.location.search)).get('js')) {
      pushMessage('UAC Warning: JavaScript has been passed from the navigation bar, malicious JavaScript may cause your browser to malfunction or pose other risks. Execute "uac" to load the JavaScript.')
      pushMessage('')
      COMMANDS.uac = {
        run: () => {
          delete COMMANDS.uac;
          eval(decodeURIComponent(atob((new URLSearchParams(window.location.search)).get('js'))))
        },
        help: 'Allow UAC',
        moreHelp: 'Allow UAC',
        usage: ''
      }
    }