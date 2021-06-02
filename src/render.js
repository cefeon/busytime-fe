const clock = require('./clock');

async function getData(listNumber) {
    let taskData;
    await fetch(`http://localhost:7777/print/today/${listNumber}`).then(response => response.json()).then(x => taskData = x);
    return taskData;
}

async function printData(myData, tasksDone) {
    tasksDone.innerHTML = '';
    myData.then(
        a => a.data.forEach(x => {
                tasksDone.innerHTML = tasksDone.innerHTML + '<li>' + "<b>" + x.startTime + "</b>" + " | " + x.name + '</li>'
            }));
}

async function addData(listNumber) {
    let nowTask = document.getElementById("nowTask").value;
    if (nowTask == "") {
        console.log("sadfromg");
        return;
    }
    const url = `http://localhost:7777/add/${nowTask}/${listNumber}`;
    getHTML(url, (Http) => {
        if (Http.readyState == 4) {
            refreshData(listNumber);
            console.log(("tasksDone"+listNumber));
        }
    });
}


async function removeLastData(listNumber) {
    const url = `http://localhost:7777/remove/${listNumber}`;
    getHTML(url, (Http) => {
        if (Http.readyState == 4) {
            refreshData(listNumber);
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

function refreshData(listNumber){
    printData(getData(listNumber),document.getElementById("tasksDone"+listNumber));
}

function start(){
    clock.start();
    refreshData(0);
    refreshData(1);
    refreshData(2);
}

start();

exports.addData = addData;
exports.removeLastData = removeLastData;