setInterval(()=>{
  if (nowpath == '/secret') {
    reload('mission.js: You should not access this folder')
  }
},1000)
let mission = COMMANDS.cat.run
COMMANDS.cat.run = (args) => {
  //�����©���ٳ���if��ʵ���Ͽ���ֱ�� ls secret �鿴���ݣ�Ȼ��cat blog/../secret/xxx.txt �Ϳ���
  if (args[0].replace(/\\/g,'/').startsWith("/secret") || ((args[0].replace(/\\/g,'/').startsWith("secret") || args[0].replace(/\\/g,'/').startsWith("./secret")) && nowpath == "/")) { 
    reload('mission.js: You should not access this file')
  } else mission(args)
}