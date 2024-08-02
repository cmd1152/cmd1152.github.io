if (whoami.includes(infoDiv.innerText.substring(2))) {
  loadpage.style.opacity = 0;
  canType = false
  setTimeout(()=>{
    document.getElementById('terminal').style.opacity = 1;
    term.focus()
    loadpage.style.display = "none";
    clearInterval(whou)
    try {
      setTimeout(()=>{
        while(!cmdinit){}
        cmdinit()
      },500)
    } catch (e) {
      window.dispatchEvent(new ErrorEvent('error', {
        message: 'Failed to load initialization function'
      }));
    }
  }, 500);
}