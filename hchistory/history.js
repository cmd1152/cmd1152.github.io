var camo = 'https://camo.hach.chat/?proxyUrl='

$('playbutton').onclick = () => {
  $('playbutton').innerText=$('playbutton').innerText=="▶️ Play"?"■ Stop":"▶️ Play"
}
document.body.scrollTop=Infinity
$('playbutton').click()
var sharebutton = $('sharebutton')
var sharebox = $id('sharebox')
var historys = {}
var timepreview = $id('timepre')
var timerange = $id('timerange')
var defchannel = false
setInterval(()=>{
  document.title = historys.channel?`${historys.channel} - hack.chat++ replay`:"hack.chat++ replay"
  if ($('playbutton').innerText=="▶️ Play") return;
  if (!historys.history) return $('playbutton').click()
  updateTime()
  updateMessage()
  let newValue = Math.max(parseInt(timerange.min),Math.min(parseInt(timerange.value)+parseInt($id('speed-selector').value),parseInt(timerange.max)))
  if (timerange.value == newValue) {
    timerange.value = timerange.min
    return $('playbutton').click()
  }
  timerange.value = newValue
},100)

function updateTime() {
  $id("playinfo").value = formatTimestamp(parseInt(timerange.value+'99'))
  document.body.style.marginBottom = $id('footer').offsetHeight + 'px';
  if (sharebutton.innerText == "★ Hide URL") sharebutton.innerText = "★ New Share (now URL is old)"
}
timerange.addEventListener('input', updateTime);
timerange.addEventListener('input', updateMessage);
function updateMessage() {
  //更新画面
  $(".messages").innerHTML=""
  //？什么弱智更新方法，历史记录一多卡死你妈的
  //好，加个 slice
  if (!historys.history) return;
  var prol = Math.min(historys.history.filter(his=>{return JSON.parse(his).time <= parseInt(timerange.value+'99') && !["chat","emote","info","warn","onlineSet","onlineAdd","onlineRemove"].includes(JSON.parse(his).cmd)}).length || 0,50)
  defchannel = false
  historys.history.filter(his=>{return JSON.parse(his).time <= parseInt(timerange.value+'99')}).slice(-30-prol).forEach(his=>{pushJSON(his)})
  window.scrollTo(0, document.body.scrollHeight);
}

function pushJSON(json) {
  if (JSON.parse(json).channel) {
    if (JSON.parse(json).channel != defchannel) {
      pushMessage({nick:'*',trip:'replay',text:`Now you in ?${JSON.parse(json).channel}`})
      defchannel = JSON.parse(json).channel
    }
  }
  COMMANDS[JSON.parse(json).cmd].call(null, JSON.parse(json), json);
  window.scrollTo(0, document.body.scrollHeight);
}

function LoadHistory(history) {
  try {
    historys.history = history.split("\n").map(a=>{return a.trim()}).filter(a=>{return a.startsWith("{") && a.endsWith("}")})
    timerange.min = historys.min = Math.floor(JSON.parse(historys.history[0]).time/100)
    timerange.max = historys.max = Math.floor(JSON.parse(historys.history[historys.history.length-1]).time/100)
    let channell = historys.history.filter(a=>{return JSON.parse(a).channel})
    if (channell.length > 0) {
      historys.channel = [...new Set(channell.map(a=>{return JSON.parse(a).channel}).filter(a=>{return a}))].join(", ")
    } else historys.channel = "*Unknown Channel*"
    defchannel=""
    if (historys.history.length > 1152) pushMessage({nick:'!',text:'More than 1152 messages, performance may decrease!\nIf you find that there is a problem with the speed, please use high speed (insufficient performance, speed to make up for :D)'})
    pushMessage({nick:'*',text:`Loaded, click \`▶️ Play\` to play... (Length: ${historys.history.length})`})
    updateTime()
  } catch (e) {
    pushMessage({nick:'!',text:'Failed to Load Historys'})
  }
}

function formatTimestamp(timestamp) {
  try {
    if (!timestamp) return `----/--/-- --:--:--`
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    
    return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
  } catch (e) {return `----/--/-- --:--:--`}
}

function stopall() {
  historys={}
  $('.messages').innerHTML=''
  timerange.max = timerange.min = timerange.value = 0
  updateTime()
  pushFrontPage()
  defchannel = ''
}
i18ntranslate=(a)=>{return a}

function parseQueryString(queryString) {
    // 去除查询字符串中的问号
    queryString = queryString.substring(1);
    // 将查询字符串按照 '&' 分割成数组
    var pairs = queryString.split("&");
    var result = {};
    
    // 遍历数组中的每一个键值对
    pairs.forEach(function(pair) {
        // 将键值对按照 '=' 分割成键和值
        var keyValue = pair.split("=");
        // 将键值对添加到结果对象中
        result[keyValue[0]] = decodeURIComponent(keyValue[1] || '');
    });
    
    return result;
}
function updateQueryString(obj) {
    var queryString = '';
    
    // 遍历对象中的每一个键值对
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            // 将键和值转换成查询字符串格式，并添加到 queryString 中
            queryString += encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]) + '&';
        }
    }
    
    // 去除末尾多余的 '&'
    queryString = queryString.slice(0, -1);
    
    return queryString;
}
let search = parseQueryString(location.search)

if (search.u) {
  pushMessage({nick:'*',text:`Loading file: ${search.u}\nPlease wait a few minutes, do not close or leave this webpage in the background`})
  if (search.u.startsWith("cb/")) {
    loadHistoryUrl(camo + 'https://files.catbox.moe/' + search.u.replace("cb/",""),search.t)
  } else loadHistoryUrl(search.u,search.t)
}
function loadHistoryUrl(weburl,time=false) {
  fetch(weburl)
    .then(response => {
      if (!response.ok) {
        pushMessage({nick:'!',text:`file response was not ok`})
      }
    return response.text();
  })
  .then(data => {
    if (data == "404! not found!") {
      pushMessage({nick:'!',text:`CB Url Failed`})
      return;
    }
    LoadHistory(data.trim())
    setTimeout(()=>{
      if (parseInt(time, 36) && historys.history) {
        timerange.value = parseInt(time, 36)
        updateTime()
        updateMessage()
      }
    },100)
  })
  .catch((error)=>{
    pushMessage({nick:'!',text:error.message})
  })
}

function share(_time=false) {
  if (sharebutton.innerText == "★ Shareing...") return;
  if (sharebutton.innerText == "★ Hide URL") {
    sharebutton.innerText = "★ Share"
    sharebox.innerText = sharebox.href = ``
    document.body.style.marginBottom = $id('footer').offsetHeight + 'px';
    window.scrollTo(0, document.body.scrollHeight);
    return;
  }
  if (!historys.history) return alert("Please load a file first")
  sharebutton.innerText == "★ Shareing..."
  document.body.style.marginBottom = $id('footer').offsetHeight + 'px';
  window.scrollTo(0, document.body.scrollHeight);
  let shareurl = window.location.origin + window.location.pathname
  let sharesearch = {}
  sharesearch.t = parseInt(timerange.value).toString(36);
  (async()=>{
    try {
      if (!document.getElementById('fileInput')) {
        if (search.u) {
          sharesearch.u = search.u
          return doneShare()
        }
        alert(`Failed to Share`)
        sharebutton.innerText == "★ Share"
        return
      }
      const file = document.getElementById('fileInput').files[0]
      const formData = new FormData();
      formData.append('reqtype', 'fileupload');
      formData.append('userhash', '');
      formData.append('fileToUpload', file);

      const response = await fetch(camo + 'https://catbox.moe/user/api.php', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        sharesearch.u = (await response.text()).replace("https://files.catbox.moe/","cb/");
        doneShare()
      } else {
        throw new Error(`Failed to Share: Failed to upload: ${await response.text()}`);
      }
    } catch (e) {
      sharebutton.innerText == "★ Share"
      alert(`Failed to Share: ${e.message || e}`)
    }
  })()
  function doneShare() {
    sharebutton.innerText = "★ Hide URL"
    if (_time !== false) sharesearch.t = _time
    sharebox.innerText = sharebox.href = `${shareurl}?${updateQueryString(sharesearch)}`
    document.body.style.marginBottom = $id('footer').offsetHeight + 'px';
    window.scrollTo(0, document.body.scrollHeight);
  }
}

//我tm是天才
document.addEventListener('wheel', (event) => {
  if (!historys.history) return;
  event.preventDefault();
  timerange.value = parseInt(timerange.value) + (event.deltaY > 0 ? 100 : -100);
  timerange.value = Math.min(Math.max(parseInt(timerange.value), parseInt(timerange.min)), parseInt(timerange.max));
  updateMessage()
  updateTime()
}, { passive: false });


$('#playinfo').addEventListener('blur', function(event) {
  let newTime = new Date(event.target.value).getTime();
  if (newTime <= parseInt(timerange.max)*100 && newTime >= parseInt(timerange.min)*100) {
    timerange.value = Math.floor(newTime/100);
  }
  updateTime();
  updateMessage();
});