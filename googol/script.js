let vButton = document.getElementById("su");
let fuckEl = document.getElementById("fuck");
let code = `U2FsdGVkX183x6NAq6AqZV7JFb4qOB2uTik5raxIYvzcv4mDVFfyFg0ax1XoA5SeX7bsF0FzvStd8WRT5u2xamJ5EoHnG2wxTbkt5jHPbmF84mPgJGBGgGx5LN/6urRnoHnxQM1uszUL7Mpm4OeVuoE48qaguVPdDcpB7BChYTRakiuYqjjtllkbo7VYkXPoP4ctYhBC1wiXVaoeyvSn6sDyNTZ8j7ZzK2SSRSSo+m193/15TiUqKRn6kROrG+UJ4P5Fna69bdEjonpOLAU8B/LIxVHev5woiv0qoefX17pl6czXP/rk2RRR9YtHZf4z7oh3jdOAhaOJe2G1RP670yQ/WQTlmjx3agMZcc+DL7GWm+kWd3/1gpazaUMLN6xIGkhW9WlphuOq+lifQ5wRZ/c0Uy0iPRaagClLZHnlUNj/2vQavItIVt1J7RGdQ8DhSkCfWFuv5A2rO3s50BzN7QQBxkIksnDXZ0+7QGimej6sEQJqAd6UpKMZToj5vxoGgX68yBR8eiZWCz8UM6WqPwbYMyac9d7yir964ozq7aiz6De3u3IajKWMkCO/klDjdZJ/MvcrdlK/CIZpKUGJbQwM75+2c0ffCUdct7rDMiFYl297ewDkfTqcX4g+4CP91cIFTXR07EHmc0AQFTmpNvcugVTuaTNAaIwlJEJlj8tl5BstAk5zFa45iOk/m4TVagjrVWvlOr4JBCIl75p7BUlC2Pirb+34fC203YeH6uReyKxUGyhy9l8chNSECZt5Hdm87hLOzvCR148bz1L1bQ==`;
function fuck() {
  ["这里有块空白", "塞点什么呢？", "也就只能塞点回忆吧", "此致怀念以前永不分离的朋友", "奈何只是黄粱一梦", "再会", "再见", "a77889966554", "shengLling", "Fu_Lu", "……", "也许再也不见了", "希望屏幕的另外一边", "你们事业有成", "（现在你可以继续阅读关于Googol的事）"].forEach((t,i)=>{
    setTimeout(()=>{
      fuckEl.innerText = t;
    },i * 2000)
  })
}
function decryptAES(ciphertext, key) {
  try {
    var bytes  = CryptoJS.AES.decrypt(ciphertext, key);
    var originalText = bytes.toString(CryptoJS.enc.Utf8);
    return originalText;
  } catch (e) {
    return null;
  }
}
function encryptAES(plaintext, key) {
  try {
    var ciphertext = CryptoJS.AES.encrypt(plaintext, key).toString();
    return ciphertext;
  } catch (e) {
    return null;
  }
}

function v() {
  vButton.disabled = true;
  vButton.innerText = "正在验证...";
  navigator.clipboard.readText().then(text => {
    let c = decryptAES(code, text);
    if (!c) return vF("凭据错误");
    eval(c);
  }).catch(err => {
    vF("请允许读取剪贴板")
  });
}
function vF(r) {
  vButton.disabled = true;
  vButton.innerText = `验证失败${r?`：${r}`:""}`;
  setTimeout(()=>{
    vButton.disabled = false;
    vButton.innerText = "验证权限";
  }, 2000)
}
