setInterval(()=>{
  if (nowpath == '/secret') {
    reload('mission.js: You should not access this folder')
  }
},1000)
let mission = COMMANDS.cat.run
COMMANDS.cat.run = (args) => {
  //故意的漏洞百出的if，实际上可以直接 ls secret 查看内容，然后cat blog/../secret/xxx.txt 就可以
  if (args[0].replace(/\\/g,'/').startsWith("/secret") || ((args[0].replace(/\\/g,'/').startsWith("secret") || args[0].replace(/\\/g,'/').startsWith("./secret")) && nowpath == "/")) { 
    reload('mission.js: You should not access this file')
  } else mission(args)
}