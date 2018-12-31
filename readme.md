### Run a command using child process

```javascript
const run = require('@sbspk/run');

async function build() {
  await run('npm run build');
  await run('npm run copy');
}

build()
  .catch(err => console.error(err));
```

License -> MIT
