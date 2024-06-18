let vButton = document.getElementById("su");
let fuckEl = document.getElementById("fuck");
let code = `U2FsdGVkX1/vR5fslqLtOQSj8GxtAMEWHb2BYycROGq4HMwpeBvbRIFx9vlvoRvvpd8sbSPkQlkDMHAYV2k4gmK+7+hDspFhDoHnO9r+Zwyfv0Xr1+HpmJZ/ZU0Hmla8plQSwzTb6JWix+n1bNQtYT1fPTOWUL6Qd45iR6EgFLJr+eFXk7IlU2kceIOVzkP2PfsEjjVIcDfdii3MfWyhUZZ5l9pzYOph1rOIeL8Dh8WIcHkA08r6RgElNzCdIBDbNtCUDEy+f0ICpY2Z4o4lAB+IAQ1zDukwnUTg3rS6mfYgvZPGAzW8100ZJ56KgYfXG3Fm97tn2wAHzmSQjAOwXxsLBax3K9Dcm2CP6MyDunWG/1INDs62FlMTZ/ew2K/Hw2tzVBhvlmoq6iLuokyXHSRuANXx7HrSamcmMtv+6JnwBdXeZ0diQHBln9LCxHTf9JKrU7WyqzOjYT0rogqk1uBW8WMjVBV4VfDkV/UdDvTpQg7f2nbFLfhhRXa+bd16dKK3kuNQfjXgSm6tcXzPrhsQp7lVeMySLPKoiDYxh5afrsm2pO4d2gPrV5BlCWVvhkfVbBCVSXiqUpayfxaP4EEdmSdlaRwqGrJuoYIlXuk0wBV/7CUL3rBLabr5tcRrwoipPQyyKWtHGjgXUdxkU7xvzaQ3JgeCq+6yZyP/JQSOzgrpmz3Mur0gnnPziDu+y0WWBDK2Y7vsIiTjg3YE4JyqUzdlRewMAknfZP/qoSGaISi3efuOYpB4ahJh54ivJwM9yH8La7ewxSbHlBlVmV29opiRfjW2hi47oBNZeAJFtKxTCUSs/CoxEhyAQsvo47GFlEZYSns/7bYhLizTFR25HCY/ExFlfHl1rBw/6zHa8ua/EqP2JaC2KCJSV8BjQOv5W0zStVwRPQ/18yMkShvJWN+1MjtyzYWV4AASleg=`;
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
