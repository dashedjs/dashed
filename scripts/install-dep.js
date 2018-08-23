const { exec } = require('child_process');

exec('sh install-dep.sh', (err, stdout, stderr) => console.log(err));
