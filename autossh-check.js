const { spawnSync } = require('child_process')

function spawnSSH() {
    spawnSync("./bg-tunnel.sh");
}

function check() {
    // do whatever you like here
    const grep = spawnSync("./check.sh")
    let count = parseInt(grep.stdout);
    
    if (count === NaN) {
        spawnSSH();
    }

    if (count <= 3) {
        spawnSSH();
    }

    setTimeout(check, 1000*60*10);
}

check()