alert("这是正在建设的新站，老站请在url后面加上“_old”\n比如 /googol_old");
document.querySelectorAll(".file").forEach((file, i)=>{
  file.style.top = 50+i*40 + 'px';
  file.addEventListener('click', (event) => {
    file.classList.add("file-open");
  });
  document.addEventListener('click', function(event) {
    if (!file.contains(event.target) && [...file.classList].includes("file-open")) {
      file.classList.add('file-close');
      file.classList.remove('file-open');
      setTimeout(()=>{
        file.classList.remove('file-close');
      }, 2000)
    }
  });
})
