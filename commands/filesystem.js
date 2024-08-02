var files = [];
var nowpath = "/";
fetch('de.notemsfile')
  .then(response => {
    if (!response.ok) {
      window.dispatchEvent(new ErrorEvent('error', {
        message: 'Unable to load notemsfile'
      }));
    }
    return response.json();
  })
  .then(json => {
    files = json;
  })
  .catch(error => {
    window.dispatchEvent(new ErrorEvent('error', {
      message: 'Unable to load notemsfile'
    }));
  });

function getParentObject(obj, path) {
  let props = path.split('.');
  let parent = obj;
  for (let i = 0; i < props.length - 1; i++) {
    parent = parent[props[i]];
    if (parent === undefined) {
      return undefined; // 如果中间的属性不存在，则返回 undefined
    }
  }
  return parent;
}

function getFiles(path) {
  let gotocd = path.replace(/\\/g,'/');
  let filePath = (gotocd.startsWith("/")?gotocd:nowpath+'/'+gotocd).split("/").filter(path=>{return path!=""});
  let file = files;
  let nop = []
  filePath.forEach((subPath)=>{
    if (subPath == "..") {
      nop.pop();
      file = getParentObject(files, nop.join("."));
    } else if (subPath !== ".") {
      nop.push(subPath);
      file = file[subPath];
    }
    if (typeof file == "undefined") return 'invalid path';
  });
  if (typeof file != "object") return 'Not a directory';
  let back = []
  let sorfile = Object.keys(file).sort((a, b) => a.localeCompare(b))
  sorfile.forEach(fileName=>{
    if (typeof file[fileName] == "object") {
      back.push('/' + fileName);
    }
  })
  sorfile.forEach(fileName=>{
    if (typeof file[fileName] != "object") {
      back.push(fileName);
    }
  })
  //排版操作，懒得做
  return back.join('\n\r'); //直接分行
}
COMMANDS.cd = {
    run: (args) => {
        if (args[0]) {
           let gotocd = args[0].replace(/\\/g,'/');
           let filePath = (gotocd.startsWith("/")?gotocd:nowpath+'/'+gotocd).split("/").filter(path=>{return path!=""});
           let file = files;
           let nop = []
           filePath.forEach((subPath)=>{
               if (subPath == "..") {
                   nop.pop();
                   file = getParentObject(files, nop.join("."));
               } else if (subPath !== ".") {
                   nop.push(subPath);
                   file = file[subPath];
               }
               if (typeof file == "undefined") return;
           });
           if (typeof file == "object") {
               nowpath = nop.join("/")?nop.join("/"):"/";
               nowpath = nowpath.startsWith("/")?nowpath:'/'+nowpath
           } else pushMessage(`\x1B[91mUnable to enter directory: \x1B[0m\x1B[31mThis path is invalid or it is not a directory at all\x1B[0m`)
        } else pushMessage(nowpath)
    },
    help: 'Enter a directory',
    moreHelp: 'Enter a directory with directory paths separated by "/"',
    usage: '[path]'
}

COMMANDS.ls = {
    run: (args) => {
        pushMessage(getFiles(args[0]?args[0]:nowpath));
    },
    help: 'List file',
    moreHelp: 'List files, similar to the ls syntax in Linux',
    usage: '[path]'
}

COMMANDS.cat = {
    run: (args) => {
        if (args[0]) {
           let gotocd = args[0].replace(/\\/g,'/');
           let filePath = (gotocd.startsWith("/")?gotocd:nowpath+'/'+gotocd).split("/").filter(path=>{return path!=""});
           let file = files;
           let nop = []
           filePath.forEach((subPath)=>{
               if (subPath == "..") {
                   nop.pop();
                   file = getParentObject(files, nop.join("."));
               } else if (subPath !== ".") {
                   nop.push(subPath);
                   file = file[subPath];
               }
               if (typeof file == "undefined") return;
           });
           if (typeof file == "string") {
               pushMessage(file.split("\n").join("\n\r"));
           } else pushMessage(`\x1B[91mUnable to read file: \x1B[0m\x1B[31mThis path is invalid or it is a directory\x1B[0m`)
        } else pushMessage(`\x1B[91mYou did not specify a path\x1B[0m`)
    },
    help: 'Read a File',
    moreHelp: 'Read a File',
    usage: '<path>'
}