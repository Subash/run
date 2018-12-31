const { spawn } = require('child_process');

module.exports = function run(command, options = {}) {
  return new Promise((resolve, reject)=> {
    const opts = {};
    opts.cwd = options.cwd || process.cwd();
    opts.env = options.env || process.env;
    opts.stdio = options.stdio || 'ignore';
    opts.shell = true;

    const cp = child_process.spawn(command, opts);
    let stderr = '', stdout = '';

    if(cp.stderr) cp.stderr.on('data', (data) => stderr = stderr + data.toString('utf-8'));
    if(cp.stdout) cp.stdout.on('data', (data) => stdout = stdout + data.toString('utf-8'));

    cp.on('error', reject);
    cp.on('exit', (code)=> {
      if(code === 0) return resolve(stdout);
      reject(new Error(stderr || stdout || `Process exited with code ${code}`));
    });
  });
}