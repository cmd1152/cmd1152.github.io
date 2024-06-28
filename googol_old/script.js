let vButton = document.getElementById("su");
let fuckEl = document.getElementById("fuck");
let code = `U2FsdGVkX19fbJQqeR3OsEIQm/6jdjnjRuISFwGGWnFVoWOWbVMg/zlP7cuRmb0zdH91fuIeOn0OX6PVhG7MtGu6B8N6ybPWuh1KOOxkrE/AjMWv3Nme9jBIbMu+Dg9rkJARpe0tk3JGgwgagpQMJbRlVToVnnBvAfyVcCrjZYmq734Zi6zG+w5UFF8Qu04OZJWgmpinUU/NHOmeBnh+V/EVlFyDKkdZdVc+64QUrS89V14uA7C0MEEuqHor5hNlN64WWsi54cOUv6PjHeb0NF5lLzPK9KWacLSKVwXSZy7ao457EZn3j4msD6SxJ7uBdWEQ8REgIs/1XF4Ab63L5VHULZlnxmNkuKo2qlLN2r3LMOJxCRnEmDVtagON4i/Axava3ZCDaFOtXhTSCBjza4CbG+bUiUSbll5HqrFHrMd4ODhw8EPkd+GEfENj97p1xcH75GahhBpaF/8yyK73bSJ0QmrarDGUYHu8PW0Lm4gooKozj5BTiQAId6GqJxFn485icYpAkDi4IXHnDif/TPgGgixV0GxlIeaUJ+OwXMOXy4fDhS5XRkJrniaG1OnY4kiKGO7qoBc8+/VAZvK6UAQc+hiIb4/bX5ZF1cMPWZzhxE6Az+I/Wcn/d4br2JQbi/xZExKn8kf/Hxi8fAIR2ZYludnr+D2Ewjoq9QoJGKsPfxVF38VOLxzjBr9Bnajtuc3T5+nycIZQdezEznWhzXchUA+LeD5BWZbmD/3arkmk981xZ2ySBnB7FftmXyeQT8DMwBs+VtK5zvsqekbYSzYp48LvajekZZ6oQBKoNPV/XbjG26T4MNxF8Ovv+37QMXkjbIlyIizP+mt9tsQYKoHIn+1apxTCNGhUnHijB/UlMOEBCMY91P6HLYD2oFmUIqXGjABGFa16TVGKTxFl9NT9dfzwoACwADh8LI1pCMmJ7haXQX7uC8EFSSv7EheWIl4pWjNTNCWYosckZD+hO692EWwr8dJZUEZPVPNxkYlrZsOibaruKXqdfwDfi8AIf32R9TLPv2pwJz+uBSqJVYE//AM77vstbZO4aFteAKI31j+U6gmd6klHa0Qp7vSF2i4QuuF8luCtz7C7v4UuCiOBFmEXBraqsRWjEwTIduw3UQ3m6AoZc/ncVzwTBwlwZ59IjdH76I2R+OW/Jqsp9XT32ABfOfSJ1OymimRQCKA=`;
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
    try {
      eval(c);
    } catch (e) {
      vF("凭据正常，但是无法继续")
    }
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

if (!confirm("本文记录了一个臭名昭著的Googol的所作所为，其中，Googol不受到大部分人喜欢，如果并非必要，阅读本文可能会因为Googol而破坏您一整天的好心情\n注：本文存在大量以其人之道还治其人之身的内容，比如MelonCmd !== cmd1152（就像 Googol 不是 Gongxiang01 一样可笑）\n（点击 确定 以继续阅读，点击 取消 关闭页面）")) {
  window.close();
  history.back();
  document.clear();
}