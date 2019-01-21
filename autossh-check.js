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

    console.log(Date(Date.now()), count);
    setTimeout(check, 1000*10);
}

check()