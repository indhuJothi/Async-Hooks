const asyncHook= require('async_hooks')
const fs = require('fs')
const net = require('net')
const {fd} = process.stdout
asyncHook.createHook({

    init(asyncId,type,triggerAsyncId){
        const eid = asyncHook.executionAsyncId();
        fs.writeSync(
            fd,
            `${type}(${asyncId}: trigger: ${triggerAsyncId} execution: ${eid}\n)`
        )
    }
}).enable()

net.createServer((conn)=>{}).listen(8080)