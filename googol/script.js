let vButton = document.getElementById("su");
let fuckEl = document.getElementById("fuck");
let code = `U2FsdGVkX19jXSyzyMLjMrlVR9B+n5GLab03A1pBFqTJqvlB8YezzKl4+cPMBRX0ck7NprgZ5EfBGAg0bazxeWgnw1snmhOFdtPdICycN7LqmCUQe86nTwgMa4RTPi+ZusA/xzZsqjXmTeBFm32e0NZBdI5bUfphHvTR3h4Z9lu4Sc/kKW4fyZZqbAmQZp+K8g3aFK4+07hKqMBYic3gC/f+lh1fus5S2gZrI+0gQO+wmMTzEuAG5psXqsqA7cB3kj7PjE6a3MoWiySX62Y7OVfnwJwgkv8bH+QDHkfT1eQoTW/IKwunu+yxk1Qde+Dg8SvwS7z3SMwjz2OtNbiODzIQ4hpY6EmxXOQ44ECxO1Vdc680RrzNBD7Hfg8pDu9GCKpfpx8lzKOAu6B6bET05lQbRnUplEI/BdgfByiCyeLU0YAvWY7NDiDTkH+QPrECcwUgik4+YytulT6+sKeXEoPsTyN4Sg6G1VLoCiBTdrzjLY1sOPjCUsTqUbLUR/pKwyMGrXr2AJ7qQViZdzWW6NE+CBRkmDgVZ06rnTEhtjmFZ/9vFO3+C1xXb61sUbaZZBWxsDNLQ2/gwl0ux6+UG0kURwmKi85WbMm/Lwd1BsXBD1VB4eg39rfYSlAec82BsPP16ACL65HYRkhrO/Zm4KdUH5Gq6elOJmnIMFJnNa2LmW8VucDMlqrdQWTjuW+2U7vyyEpwtcOo9v0YSLYaCygyo7qFNqqK2qO0D4Mg2y+OBRUr2Y7pmgvpuo2rN+9+PKUVMDI3Km3qtlehaV5VrS0f9/IWxaKSeFdSt97Dl/8fPTv9gePQF3RYQPmtL9UTh8mV5p5v0ZyswELQ1potd73ULDQ2Boz8wbAH5vdLsZP6bRrthwLsztQxV3bksKe0JAsDf7Qcv21/qFwwNPBlrQReRNlUvddBPD32XO2W1erPGrYCXge5SzBEkrbQnDjgDzk+Z1CoLbYJTyeLnUMQ9j/rNZTeWjcfBuKl2WN3BRXwLvA9LrJ3HOPSwFeAusXLvm1hxTAAKxDB/r/ylM/1RIj9s5+B0V4JsdtwtNUamasUHb4moE7HlzPm+mo2ar5A9UBmfjvO2c33/uuodBwSm9sA1aPI76o51JXMgeW3peG1upgJ7Xfo65EA9Bl0SXfelID6vxrF5yQONW4/ezLLuZLKOM37UMXq3H68NQbgB/8=`;
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
