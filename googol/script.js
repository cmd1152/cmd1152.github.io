alert("这是正在建设的新站，老站请在url后面加上“_old”\n比如 /googol_old");
document.querySelectorAll(".file").forEach((file, i)=>{
  file.style.top = i*40 + 'px';
  file.addEventListener('click', (event) => {
    file.classList.add("file-open");
    file.focus();
  });
  file.addEventListener('blur', (event) => {
    file.classList.remove("file-open");
  });
})