function start(){
  // Get the input field
  var timer = document.getElementById("clock");

  function time() {
      var d = new Date();
      var s = d.getSeconds();
      var m = d.getMinutes();
      var h = d.getHours();
      
      timer.textContent = ("0" + h).substr(-2) + ":" + ("0" + m).substr(-2) + ":" + ("0" + s).substr(-2);
      /* if(s%58==0){
          let url = `https://source.unsplash.com/random/800x600?a=${h}${m}${s}`;
          document.body.style.background = "linear-gradient(rgba(0, 0, 0, 0.527),rgba(0, 0, 0, 0.5)), url("+url+")";
      } */
  }

  setInterval(time, 1000);
}

exports.start = start;