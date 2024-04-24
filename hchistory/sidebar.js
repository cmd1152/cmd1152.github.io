$id('sidebar').onmouseenter = $id('sidebar').onclick = function (e) {
	if (e.target == $id('sidebar-close')) {
		return
	}
	$id('sidebar-content').classList.remove('hidden');
	$id('sidebar').classList.add('expand');
	e.stopPropagation();
}

$id('sidebar').onmouseleave = document.ontouchstart = function (event) {
	var e = event.toElement || event.relatedTarget;
	try {
		if (e.parentNode == this || e == this) {
			return;
		}
	} catch (e) { return; }

	if (!$id('pin-sidebar').checked) {
		$id('sidebar-content').classList.add('hidden');
		$id('sidebar').classList.remove('expand');
	}
}

$id('sidebar-close').onclick = function () {
	if (!$id('pin-sidebar').checked) {
		$id('sidebar-content').classList.add('hidden');
		$id('sidebar').classList.remove('expand');
	}
}


/* ---Sidebar settings--- */

function registerSetting(name, default_ = false, callback = null, on_register = null) {
	let checkbox = document.getElementById(name)
	let enabled = default_ ? localStorageGet(name) != 'false' : localStorageGet(name) == 'true'
	checkbox.checked = enabled
	checkbox.onchange = function (e) {
		localStorageSet(name, !!e.target.checked)
		if (typeof callback == 'function') {
			callback(!!e.target.checked)
		}
	}
	if (typeof on_register == 'function') {
		on_register(enabled)
	} else if (on_register == true || on_register == null && typeof callback == 'function') {
		callback(enabled)
	}
	return enabled
}

// Restore settings from localStorage

registerSetting('pin-sidebar', false, null, (enabled) => {
	if (enabled) {
		$id('sidebar-content').classList.remove('hidden');
	}
})

registerSetting('joined-left', true)

registerSetting('parse-latex', true, (enabled) => {
	if (enabled) {
		md.inline.ruler.enable(['katex']);
		md.block.ruler.enable(['katex']);
	} else {
		md.inline.ruler.disable(['katex']);
		md.block.ruler.disable(['katex']);
	}
}, true)

registerSetting('syntax-highlight', true, (enabled) => {
	markdownOptions.doHighlight = enabled
}, true)

registerSetting('allow-imgur', true, (enabled) => {
	allowImages = enabled
	$id('allow-all-images').disabled = !enabled
}, true)

registerSetting('allow-all-images', false, (enabled) => {
	whitelistDisabled = enabled
}, true)

var auto_fold, do_log_messages, should_get_info

registerSetting('auto-fold', false, (enabled) => {
	auto_fold = enabled
}, true)


toggleLog()

function toggleLog() {
	let _ = do_log_messages ? '[log enabled]' : '[log disabled]'
	jsonLog += _;
	readableLog += '\n' + _;
}

/* ---Buttons for some mobile users--- */

function createMobileButton(text, callback, id) {
	id = id ?? text.toLowerCase()
	let container = $id('more-mobile-btns')
	let button = document.createElement('button')
	button.type = 'button'
	button.classList.add('char')
	button.textContent = text
	button.onclick = typeof callback == 'function' ? callback : (
		typeof callback == 'string' ? () => insertAtCursor(callback) : () => insertAtCursor(text)
	)
	container.appendChild(button)
}

/* ---Sidebar user list--- */

// User list
var onlineUsers = []
var ignoredUsers = []
var ignoredHashs = []
var usersInfo = {};

function userAdd(nick, user_info) {
	let trip = user_info.trip

	if (nick.length >= 25) {
		pushMessage({ nick: '!', text: "A USER WHOSE NICKNAME HAS MORE THAN 24 CHARACTERS HAS JOINED. THIS INFINITE LOOP SCRIPT WHICH MAY CRASH YOUR BROWSER WOULD BE RUN IN OFFICIAL CLIENT:\n ```Javascript\nfor (var i = 5; i > 3; i = i + 1) { console.log(i); }\n```" })
		pushMessage({ nick: '!', text: "This is probably caused by a moderator using the `overflow` command on you. Maybe that command is one supposed to crash the browser of the target user..." })
	}

	var user = document.createElement('a');
	user.textContent = nick;

	user.onclick = function (e) {
		userInvite(nick)
	}

	user.oncontextmenu = function (e) {
		e.preventDefault()
		if (ignoredUsers.indexOf(nick) > -1) {
			userDeignore(nick)
			pushMessage({ nick: '*', text: `Cancelled ignoring nick ${nick}.` })
		} else {
			userIgnore(nick)
			pushMessage({ nick: '*', text: `Ignored nick ${nick}.` })
		}
	}

	user.onmouseenter = function (e) {
		user.classList.add('nick')
		addClassToMessage(user.parentElement, user_info)
		addClassToNick(user, user_info)
	}

	user.onmouseleave = function (e) {
		user.style.removeProperty('color')
		user.className = ''
	}

	var userLi = document.createElement('li');
	userLi.appendChild(user);

	if (user_info.hash) {
		userLi.title = user_info.hash
	}

	userLi.id = `user-li-${nick}`

	if (trip) {
		let tripEl = document.createElement('span')
		tripEl.textContent = ' ' + trip
		tripEl.classList.add('trip')
		userLi.appendChild(tripEl)
	}

	//$id('users').appendChild(userLi);
	onlineUsers.push(nick);

	usersInfo[nick] = user_info
}

function userRemove(nick, user_info) {
	var index = onlineUsers.indexOf(nick);
	if (index >= 0) {
		onlineUsers.splice(index, 1);
	}

	delete usersInfo[nick]
}

function userUpdate(args) {
	usersInfo[args.nick] = {
		...usersInfo[args.nick],
		...args
	}

	let user_info = usersInfo[args.nick]

}

function usersClear() {
	onlineUsers.length = 0;
}

function userInvite(nick) {
	let target = prompt(i18ntranslate('target channel:(defaultly random channel generated by server)', 'prompt'))
	if (target) {
		send({ cmd: 'invite', nick: nick, to: target });
	} else {
		if (target == '') {
			send({ cmd: 'invite', nick: nick });
		}
	}
}

function userIgnore(nick) {
	ignoredUsers.push(nick)
}

function userDeignore(nick) {
	ignoredUsers.splice(ignoredUsers.indexOf(nick))
}

function hashIgnore(hash) {
	ignoredHashs.push(hash)
}

function hashDeignore(hash) {
	ignoredHashs.splice(ignoredHashs.indexOf(hash))
}


/* ---Sidebar switchers--- */

/* color scheme switcher */

var schemes = [
	'android',
	'android-white',
	'atelier-dune',
	'atelier-forest',
	'atelier-heath',
	'atelier-lakeside',
	'atelier-seaside',
	'banana',
	'bright',
	'bubblegum',
	'chalk',
	'default',
	'eighties',
	'fresh-green',
	'greenscreen',
	'hacker',
	'maniac',
	'mariana',
	'military',
	'mocha',
	'monokai',
	'nese',
	'ocean',
	'ocean-OLED',
	'omega',
	'pop',
	'railscasts',
	'solarized',
	'tk-night',
	'tomorrow',
	'carrot',
	'catppuccin',
	'lax',
	'Ubuntu',
	'gruvbox-light',
	'fried-egg',
	'rainbow',
	'turbid-jade',
	'old-paper',
	'chemistory-blue',
	// 'crosst-chat-night',
	// 'crosst-chat-city',
	'backrooms-liminal',
	'amoled',
	'retro',
	'hell',
	'Waifu',
	'flamingo',
];

var highlights = [
	'agate',
	'androidstudio',
	'atom-one-dark',
	'darcula',
	'github',
	'rainbow',
	'tk-night',
	'tomorrow',
	'xcode',
	'zenburn',
]

var languages = [
	['English', 'en-US'],
	['简体中文', 'zh-CN']
]

var currentScheme = 'atelier-dune';
var currentHighlight = 'darcula';

function setScheme(scheme) {
	currentScheme = scheme;
	$id('scheme-link').href = "schemes/" + scheme + ".css";
	localStorageSet('scheme', scheme);
}

function setHighlight(scheme) {
	currentHighlight = scheme;
	$id('highlight-link').href = "vendor/hljs/styles/" + scheme + ".min.css";
	localStorageSet('highlight', scheme);
}

function setLanguage(language) {
	lang = language
	localStorageSet('i18n', lang);
	pushMessage({ nick: '!', text: 'Please refresh to apply language. Multi language is in test and not perfect yet. ' }, { i18n: true })
}
// load tunnels
var tunnels = localStorageGet('tunnels');
if (tunnels) {
	tunnels = JSON.parse(tunnels);
} else {
	tunnels = ["wss://hack.chat/chat-ws"]
	localStorageSet('tunnels', JSON.stringify(tunnels))
}
var currentTunnel = localStorageGet("current-tunnel");
var ws_url
if (currentTunnel) {
	ws_url = currentTunnel
} else {
	localStorageSet("current-tunnel", "wss://hack.chat/chat-ws")
	ws_url = "wss://hack.chat/chat-ws"
}

// Add scheme options to dropdown selector
schemes.forEach(function (scheme) {
	var option = document.createElement('option');
	option.textContent = scheme;
	option.value = scheme;
	$id('scheme-selector').appendChild(option);
});

highlights.forEach(function (scheme) {
	var option = document.createElement('option');
	option.textContent = scheme;
	option.value = scheme;
	$id('highlight-selector').appendChild(option);
});


$id('scheme-selector').onchange = function (e) {
	setScheme(e.target.value);
}

$id('highlight-selector').onchange = function (e) {
	setHighlight(e.target.value);
}

// Load sidebar configaration values from local storage if available
if (localStorageGet('scheme')) {
	setScheme(localStorageGet('scheme'));
}

let ctunnel

if (localStorageGet('highlight')) {
	setHighlight(localStorageGet('highlight'));
}

if (localStorageGet('current-tunnel')) {
	ctunnel = localStorageGet('current-tunnel')
} else {
	ctunnel = "wss://hack.chat/chat-ws"
}

$id('scheme-selector').value = currentScheme;
$id('highlight-selector').value = currentHighlight;
