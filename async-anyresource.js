const { createServer } = require('http');
const {
  executionAsyncId,
  executionAsyncResource,
  createHook
} = require('async_hooks');
const sym = Symbol('state'); // Private symbol to avoid pollution

createHook({
  init(asyncId, type, triggerAsyncId, resource) {
    const cr = executionAsyncResource();
    if (cr) {
      resource[sym] = cr[sym];
    }
  }
}).enable();

const server = createServer((req, res) => {
  executionAsyncResource()[sym] = { state: req.url };
  console.log('Hi')
  setTimeout(function() {
    res.end(JSON.stringify(executionAsyncResource()[sym]));
  }, 10);
}).listen(3000);


