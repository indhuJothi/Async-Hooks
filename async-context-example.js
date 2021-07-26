const async_hooks= require('async_hooks')
const fs = require('fs')
const net = require('net')
const {fd} = process.stdout
new Promise((resolve) => resolve(true)).then((a) => {});
let indent = 1;
async_hooks.createHook({
    init(asyncId,type,triggerAsyncId){
        const eid =async_hooks.executionAsyncId();
        const indentStr= ' '.repeat(indent);
      
        fs.writeSync(fd,
          `${indentStr}${type}(${asyncId}):`+`trigger: ${triggerAsyncId} execution: ${eid}\n`);
    },
before(asyncId){
    const indentStr = ' '.repeat(indent);
    fs.writeSync(fd, `${indentStr}before:  ${asyncId}\n`);
    indent += 2;
},
after(asyncId){
    indent -= 2;
    const indentStr = ' '.repeat(indent);
    fs.writeSync(fd, `${indentStr}after:  ${asyncId}\n`);
},
destroy(asyncId) {
    const indentStr = ' '.repeat(indent);
    fs.writeSync(fd, `${indentStr}destroy:  ${asyncId}\n`);
  },
}).enable();


net.createServer(() => {}).listen(8080, () => {
   
    setTimeout(() => {
      console.log('>>>', async_hooks.executionAsyncId());
    }, 10);
  });