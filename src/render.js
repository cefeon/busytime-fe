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
            x => tasksDone.innerHTML = tasksDone.innerHTML + '<li>' + "<b>"+x.startTime+"</b>" + " | " + x.name + '</li>'
        )
    );
}

async function addData() {
    let nowTask = document.getElementById("nowTask").value;
    if (nowTask=="") {
        console.log("sadfromg");
        return;
    }
    const Http = new XMLHttpRequest();
    const url = `http://localhost:7777/add/${nowTask}`;
    Http.open("GET", url);
    Http.send();

    Http.onreadystatechange = (e) => {
        console.log(Http.responseText)
        if(Http.readyState==4){
            printData(getData());
        }
    }
}

function startClock(){
    var timer = document.getElementById("clock");

    function time() {
        var d = new Date();
        var s = d.getSeconds();
        var m = d.getMinutes();
        var h = d.getHours();
        timer.textContent = ("0" + h).substr(-2) + ":" + ("0" + m).substr(-2) + ":" + ("0" + s).substr(-2);
        if(s%58==0){
            let url = `https://source.unsplash.com/random/800x600?a=${h}${m}${s}`;
            document.body.style.background = "linear-gradient(rgba(0, 0, 0, 0.527),rgba(0, 0, 0, 0.5)), url("+url+")";
        }
    }

    setInterval(time, 1000);
}

startClock();
printData(getData());