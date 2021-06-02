const clock = require('./clock');

async function getData() {
    let taskData;
    await fetch('http://localhost:7777/print/today').then(response => response.json()).then(x => taskData = x);
    return taskData;
}
async function printData(myData) {
    let tasksDone = document.getElementById("tasksDone");
    tasksDone.innerHTML = '';
    myData.then(
        a => a.data.forEach(
            x => tasksDone.innerHTML = tasksDone.innerHTML + '<li>' + "<b>" + x.startTime + "</b>" + " | " + x.name + '</li>'
        )
    );
}

async function addData() {
    let nowTask = document.getElementById("nowTask").value;
    if (nowTask == "") {
        console.log("sadfromg");
        return;
    }
    const url = `http://localhost:7777/add/${nowTask}`;
    getHTML(url, (Http) => {
        if (Http.readyState == 4) {
            printData(getData());
        }
    });
}

async function removeLastData() {
    const url = `http://localhost:7777/remove`;
    getHTML(url, (Http) => {
        if (Http.readyState == 4) {
            printData(getData());
        }
    }); 
}

async function getHTML(url, callback) {
    const Http = new XMLHttpRequest();
    Http.open("GET", url);
    Http.send();
    Http.onreadystatechange = (e) => {
        console.log(Http.responseText)
        callback(Http);
    }
}

clock.start();
printData(getData());

exports.addData = addData;