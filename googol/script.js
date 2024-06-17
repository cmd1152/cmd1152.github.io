function fuck() {
  let fuckEl = document.getElementById("fuck");
  ["这里有块空白", "塞点什么呢？", "也就只能塞点回忆吧", "此致怀念以前永不分离的朋友", "奈何只是黄粱一梦", "再会", "再见", "a77889966554", "shengLling", "Fu_Lu", "……", "也许再也不见了", "希望屏幕的另外一边", "你们事业有成", "（现在你可以继续阅读关于Googol的事）"].forEach((t,i)=>{
    setTimeout(()=>{
      fuckEl.innerText = t;
    },i * 2000)
  })
}