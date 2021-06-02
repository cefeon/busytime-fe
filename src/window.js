const remote = require('electron').remote;
const render = require('./render');
const win = remote.getCurrentWindow();

document.onreadystatechange = (event) => {
    if (document.readyState == "complete") {
        handleWindowControls();
    }
};

win.webContents.on("before-input-event", (event, input) => {
    if(input.key=='Enter'&&input.type=='keyDown'){
        render.addData();
    }
});

window.onbeforeunload = (event) => {
    win.removeAllListeners();
}

function handleWindowControls() {
    document.getElementById('close-button').addEventListener("click", event => {
        win.close();
    });
}
