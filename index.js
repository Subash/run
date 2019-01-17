const { spawn } = require('child_process');

module.exports = function run(command, options = {}) {
  return new Promise((resolve, reject)=> {
    const opts = {};
    opts.cwd = options.cwd || process.cwd();
    opts.env = options.env || process.env;
    opts.stdio = options.stdio || 'pipe';
    opts.shell = true;

    const cp = spawn(command, opts);
    let stderr = Buffer.alloc(0), stdout = Buffer.alloc(0);

    if(cp.stderr) cp.stderr.on('data', data => stderr = Buffer.concat([ stderr, data ]));
    if(cp.stdout) cp.stdout.on('data', data => stdout = Buffer.concat([ stdout, data ]));

    cp.on('error', reject);
    cp.on('exit', (code)=> {
      if(code === 0) return resolve(stdout.toString('utf-8'));
      reject(new Error(stderr.toString('utf-8') || stdout.toString('utf-8') || `Process exited with code ${code}`));
    });
  });
}