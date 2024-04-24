$('playbutton').onclick = () => {
  $('playbutton').innerText=$('playbutton').innerText=="▶️ Play"?"■ Stop":"▶️ Play"
}
$('playbutton').click()
var historys = {}
var timepreview = $id('timepre')
var timerange = $id('timerange')
setInterval(()=>{
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
  COMMANDS[JSON.parse(json).cmd].call(null, JSON.parse(json), json);
  window.scrollTo(0, document.body.scrollHeight);
}

function LoadHistory(history) {
  try {
    historys.history = history.split("\n").map(a=>{return a.trim()}).filter(a=>{return a.startsWith("{") && a.endsWith("}")})
    timerange.min = historys.min = Math.floor(JSON.parse(historys.history[0]).time/100)
    timerange.max = historys.max = Math.floor(JSON.parse(historys.history[historys.history.length-1]).time/100)
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
}
i18ntranslate=(a)=>{return a}