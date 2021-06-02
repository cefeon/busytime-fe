const remote = require('electron').remote;
const {addData} = require('./render');
const removeLastData = require('./render').removeLastData;
const win = remote.getCurrentWindow();

document.onreadystatechange = (event) => {
    if (document.readyState == "complete") {
        handleWindowControls();
    }
};

win.webContents.on("before-input-event", (event, input) => {
    if(input.key=='Enter'&&input.type=='keyDown'){
        addData(0);
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
