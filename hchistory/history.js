$('playbutton').onclick = () => {
  $('playbutton').innerText=$('playbutton').innerText=="▶️ Play"?"■ Stop":"▶️ Play"
}
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
  let newValue = Math.min(parseInt(timerange.value)+parseInt($id('speed-selector').value),parseInt(timerange.max))
  if (timerange.value == newValue) {
    timerange.value = timerange.min
    return $('playbutton').click()
  }
  timerange.value = newValue
},100)

function updateTime() {
  $id("playinfo").innerText = formatTimestamp(parseInt(timerange.value+'99'))
  document.body.style.marginBottom = $id('footer').offsetHeight + 'px';
  if (sharebutton.innerText == "★ Hide URL") sharebutton.innerText = "★ New Share (now URL is old)"
}
timerange.addEventListener('input', updateTime);
timerange.addEventListener('input', updateMessage);
function updateMessage() {
  //更新画面
  $(".messages").innerHTML=""
  //？什么弱智更新方法，历史记录一多卡死你妈的
  //好，加个 .slice(-152)
  if (!historys.history) return;
  historys.history.filter(his=>{return JSON.parse(his).time <= parseInt(timerange.value+'99')}).slice(-152).forEach(his=>{pushJSON(his)})
  window.scrollTo(0, document.body.scrollHeight);
}

function pushJSON(json) {
  if (JSON.parse(json).channel) {
    if (JSON.parse(json).channel != defchannel) {
      pushMessage({nick:'!',trip:'reply',text:`Now you in ?${JSON.parse(json).channel}`})
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

if (search.url) {
  pushMessage({nick:'*',text:`Loading file: ${search.url}`})
  loadHistoryUrl(search.url,search.time)
}
function loadHistoryUrl(weburl,time=false) {
  fetch(weburl)
    .then(response => {
      if (!response.ok) {
        return pushMessage({nick:'!',text:`Network response was not ok`})
      }
    return response.text();
  })
  .then(data => {
    LoadHistory(data.trim())
    setTimeout(()=>{
      if (parseInt(time) && historys.history) {
        timerange.value = parseInt(time)
        updateTime()
        updateMessage()
      }
    },100)
  })
  .catch((error)=>{
    pushMessage({nick:'!',text:error.message})
  })
}

function share() {
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
  sharesearch.time = timerange.value;
  (async()=>{
    try {
      if (!document.getElementById('fileInput')) {
        if (search.url) {
          sharesearch.url = search.url
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

      const response = await fetch('https://camo.hach.chat/?proxyUrl=https://catbox.moe/user/api.php', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        sharesearch.url = await response.text();
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
    sharebox.innerText = sharebox.href = `${shareurl}?${updateQueryString(sharesearch)}`
    document.body.style.marginBottom = $id('footer').offsetHeight + 'px';
    window.scrollTo(0, document.body.scrollHeight);
  }
}