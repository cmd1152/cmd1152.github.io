/* Notems NodejsLib/Command */

const http2 = require('http2');
if (process.mainModule === module) {
  const command = process.argv;
  command.shift();
  command.shift();
  switch(command[0]) {
    case 'get':
      get(command[1])
      .then (e=>console.log(e))
      .catch (e=>console.error(`错误：请求页面失败：${e}`));
      break;
    case 'set':
      let text = command;
      text.shift();
      text.shift();
      set(command[1], text)
      .then (e=>console.log(`成功：成功修改了页面`))
      .catch (e=>console.error(`错误：修改页面失败：${e}`));
      break;
    case 'help':
      [
        "Note.ms 编辑库帮助",
        "",
        "使用方法：",
        "1.命令行",
        "node notems <get/set> <path> [text]",
        "            ^^^^^^^^^ ^^^^^^ ^^^^^^",
        "            设定读写   路径   内容",
        "",
        "示例：node notems get chat",
        "      node notems set 1234 hi",
        "",
        "2.Nodejs库",
        "在你的Nodejs项目开头插入下面代码：",
        "const notems = require('path/to/notems.js');",
        "然后，你就可以在你的项目使用下面命令读写页面：",
        "notems.get(<path>) 与 notems.set(<path>,<text>)",
        "",
        "示例：notems.get('chat')",
        "      notems.set('1234','hi')",
        "",
        "Make by MelonCmd. Thanks 4n0n4me."
      ].forEach(e=>console.log(e));
      break;
    default:
      console.log('错误，请使用 help 查看帮助');
  }
}

function get(path) {
  return new Promise((resolve, reject) => {
    let client = http2.connect('https://note.ms/');
    req = client.request({
      ':path': `/${path}`,
      ':method': 'GET',
      'User-Agent': 'curl/8.1.2',
      'Accept': '*/*'
    });
    req.setEncoding('utf8');
    let data = '';
    req.on('data', (c) => {
      data += c;
    });
    req.on('response', (headers) => {
      if (headers[':status'] !== 200) { 
        client.close();
        reject(headers[':status']);
      }
    })
    req.on('end', () => {
      client.close();
      resolve(data);
    });
    client.on('error', (err) => {
      client.close();
      reject(err.message);
    });
    req.end();
  })
}
function set(path,text) {
  return new Promise((resolve, reject) => {
    let client = http2.connect('https://note.ms/');
    let body = `&t=${encodeURIComponent(text)}`;
    req = client.request({
      ':method': 'POST',
      ':path': '/' + path,
      'Accept': '*/*',
      'Accept-Language': 'zh-CN,zh;q=0.9',
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'Content-Length': body.length.toString(),
      'Origin': 'https://note.ms',
      'Referer': 'https://note.ms/' + path,
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36',
      'X-Requested-With': 'XMLHttpRequest'
    });
    req.setEncoding('utf8');
    req.on('response', (headers) => {
      if (headers[':status'] !== 200) {
        client.close();
        reject(headers[':status']);
      } else resolve();
    })
    client.on('error', (err) => {
      client.close();
      reject(err.message);
    })
    req.end(body);
  })
}

module.exports = { get,set };