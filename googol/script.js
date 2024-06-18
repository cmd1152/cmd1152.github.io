let vButton = document.getElementById("su");
let fuckEl = document.getElementById("fuck");
let code = `U2FsdGVkX1/MXftWZgGoKFfzO7Xwwm/WZEhG8++Ttuz5TpB4FcgmBfb8lvYjxn+BWPuLSlKlD3MzogmsgeMYoIKkccKTEgkKq/lfKWS3LajrotLRM6HLsn+gwS3x+RxTTMfXTlcsjB/5I4p8xiJ60Q9p7G7UdzSCJNEZojwnv8yK0NEh07yH0qHCQuxCk+BhjsxMG1JVCKAe9UH620NqsjObZM3RNr9vsgLQy17WKBELgY9Gg3kFltqOaqS67eCk9W79weyFfDk40AYABMdK4/+xKLx/IrkYHOZekSv6hp8ylxnCLa19KSIxhr30gRYm7pFYhHie9w6KC3OKFyp0G7c+nzCFHh2H3pt6LcLtOjK/16j6gQ+uQyiklwaACMx40SRXF8zSukCqAYgomR52Z0Rl+t9ORQRSC0PZsRMYy4BCfo7smsvGFhJOJoc9za+I5R9Ud32KuPDkaCnkAwQ/Hh+3lq634cDqW2cXDV0nkC3+nF0aE58gDKQqL2xuJSqW9QWPQFNGDHuYOn6+Vo7TgzM+GsSAyOsm12R54WBHiuphOAJQsl1Z2RRwLd80YNzt6E2NRjObuOOV39Azty4n7C8kea6ZKpOMWUR0gO7f1yUEHJu4K6uo0FH7ei/TJCHd2+ps6JGJRc5TCNE3Q1didiLoxda0CTYkdVkLSHrFexDsoI3ChPhTFhjkamlBe5FYGJxDZQEnV6bJmvmcPQAq8r5wtaSq8ourM8j34W4SzOlOkhJ1HPFIr44wz7ueBbZb9KomzvDcQqLIUKhLT0uAlrl+dTmYE3XVE2n41BoVDZs75/S4eym+2NNs9XmFb6xW19RdcgNjYPvmr0+n46SM+ItQbC0Hu+g/QwgXG1HGhwBcg4rwKxCpBdts6vQSFHafMilEvh73mJTWtfC2ZNveftbF6fhNvIKTZYkRHHeflb4e90vJKjEy6DyZr19fI45RwghVQQk8c8oWD0BVB6nEVl4sFPLH/A81I+a4cdg1Q2BiBeTobPciWo73Q55PhaSxYRupVMoQDLjytTDnuNIBX8zhB3VBIr0mytbS1zhFKDIp4fLnc3tYYaUCwUWuOJpsVVY5elABFo5u6Qf/tzjT19Bt4ZKxBmvE1AuittY9lQY=`;
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
