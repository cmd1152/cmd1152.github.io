

//make frontpage have a getter
//https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/get#%E4%BD%BF%E7%94%A8defineproperty%E5%9C%A8%E7%8E%B0%E6%9C%89%E5%AF%B9%E8%B1%A1%E4%B8%8A%E5%AE%9A%E4%B9%89_getter
function frontpage() {
	setTimeout(()=>{
		document.getElementById('fileInput').addEventListener('change', function(event) {
			const file = event.target.files[0];
			const reader = new FileReader();
			pushMessage({nick:'*',text:`Update as CB File...`})
			reader.onload = function(event) {
				LoadHistory(event.target.result.trim())
				share(0)
				let w = setInterval(()=>{
					if (sharebox.innerText) {
						window.location.href=sharebox.innerText
						sharebox.innerText="[Done] Updated as CB File"
						clearInterval(w)
					}
				},100)
				setTimeout(()=>{
					clearInterval(w)
					pushMessage({nick:'!',text:`It takes a long time to upload as CB file?\nCheck your network connection and try again!`})
				},10000)
			};

			reader.readAsText(file); 
		});
	},100)
	return [
		"<input type=\"file\" id=\"fileInput\" multiple=\"false\">",
                md.render([
			"Choose a file with a format similar to this to play: ",
			"```JSON",
			`{"cmd":"chat","nick":"MelonCmd","text":"hi yooooo","trip":"cmdTV+","color":"20201d","time":${new Date().getTime()-30}}`,
			`{"cmd":"chat","nick":"MelonCmd","text":"Welcome!","trip":"cmdTV+","color":"20201d","time":${new Date().getTime()}}`,
			"```",
                        "or play file in Internet:"
		].join('\n')),
		"<input type=\"text\" id=\"url-input\" placeholder=\"Enter URL\" style=\"color:#000; width:calc(100% - 100px)\"><button onclick=\"loadHistoryUrl($id('url-input').value);\">Play</button>",
		md.render([
			"If you want to share a local file with timestamps, please don't rush to click `▶️ Play` after importing it. Instead, click `★ Share` to obtain a web link. Then, click on the web link to switch the file to a web-based one. Now, you can encounter the desired timestamp during playback, click `★ Share` to generate a web URL pointing to that specific timestamp. Finally, share this URL with your friends. If you attempt to share a local file URL with timestamps, you will only receive an error message."
		].join('\n'))
	].join('\n')
}


var info = {}


function pushFrontPage() {
	pushMessage({ text: frontpage() }, { isHtml: true, i18n: false, noFold: true })
}

/* ---Some variables to be used--- */

var myNick = localStorageGet('my-nick') || '';
var myColor = localStorageGet('my-color') || null;//hex color value for autocolor
var myChannel = window.location.search.replace(/^\?/, '')

var lastSent = [""];
var lastSentPos = 0;

var kolorful = false
var devMode = false

//message log
var jsonLog = '';
var readableLog = '';

var templateStr = '';

var replacement = '\*\*'
var hide = ''
var replace = ''

var lastcid;

var seconds = {
	'join': {
		'times': [],
		'last': (new Date).getTime(),
	},
}

var lastMentioned = ''

/* ---Session Command--- */

function getInfo() {
	return new Promise(function (resolve, reject) {
		let ws = new WebSocket(ws_url);

		ws.onopen = function () {
			this.send(JSON.stringify({ cmd: "session", isBot: false }))
		}

		ws.onmessage = function (message) {
			let data = JSON.parse(message.data)
			if (data.cmd != 'session') {
				return
			}
			info.public = data.public
			info.chans = data.chans
			info.users = data.users
			if (should_get_info) {
				for (let i = 0; i < channels.length; i++) {
					let line = channels[i]
					for (let j = 0; j < line.length; j++) {
						let channel = line[j]
						let user_count = info.public[channel.slice(1)]
						if (typeof user_count == 'number') {
							channel = channel + ' ' + '(' + user_count + ')'
						} else {
							channel = channel + ' ' + '(\\\\)'
						}
						line[j] = channel
					}
					channels[i] = line
				}
			}
			this.close()
			resolve()
		}
	})
}

/* ---Window and input field and sidebar stuffs--- */

var windowActive = true;
var unread = 0;

window.onfocus = function () {
	windowActive = true;

	updateTitle();
}

window.onblur = function () {
	windowActive = false;
}

window.onscroll = function () {
	if (isAtBottom()) {
		updateTitle();
	}
}

function isAtBottom() {
	return (window.innerHeight + window.scrollY) >= (document.body.scrollHeight - 1);
}

function updateTitle() {
	unread = 0;
}


function silentSendText(text) {
	if (kolorful) {
		send({ cmd: 'changecolor', color: Math.floor(Math.random() * 0xffffff).toString(16).padEnd(6, "0") });
	}

	if (isAnsweringCaptcha && text != text.toUpperCase()) {
		text = text.toUpperCase();
		pushMessage({ nick: '*', text: 'Automatically converted into upper case by client.' });
	}

	if (purgatory) {
		send({ cmd: 'emote', text: text });
	} else {
		// Hook localCmds
		if(isSPCmd(text)){
			callSPcmd(text)
		}else{
			send({ cmd: 'chat', text: text });
		}
	}
	return text;
}

function checkIsMobileOrTablet() {
	let check = false;
	(function (a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true; })(navigator.userAgent || navigator.vendor || window.opera);
	return check;
};

// const isMobile = checkIsMobileOrTablet()
