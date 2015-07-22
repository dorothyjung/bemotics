var engine, es;

function ELSPlugin(){
  return document.getElementById('plugin0')
}

function checkPluginExits(){
  var L = navigator.plugins.length;
  for(var i = 0; i < L; i++) {
    console.log(
      navigator.plugins[i].name +
      " | " +
      navigator.plugins[i].filename +
      " | " +
      navigator.plugins[i].description +
      " | " +
      navigator.plugins[i].version +
      "<br>"
    );
    if(navigator.plugins[i].name=="EmotivLifeSciences"){
      return true;
    }
  }
  return false;
}

//will call the download.php file, need to copy from installation folder to app
window.onload=function(){
  if(!checkPluginExits()){
    var confirmDownload = confirm("Download plugin (Please restart your browser after install plugin)?");
    if (confirmDownload == true){
      window.location.href=('download.php');
    }
  }
};

//https://github.com/ducnguy/eric/blob/master/js/userInteraction.js
$(document).ready(function(e){ 
  engine = EmoEngine.instance()
  console.log(engine)
  es = new EmoState();

  engine.Connect();
});

var startTime;
$(document).on('click', '#startStream', function() {
  startTime = new Date();
  updateEmoEngine();
});

$(document).on('click', '#stopStream', function() {
  clearTimeout(timer);
});

function updateEmoEngine(){

  engine.ProcessEvents(500);

  var currTime = new Date();
  var elapsedTime = currTime - startTime;
  console.log("Elapsed time: " + currMsec);

  var EngagementBoredomScore = es.AffectivGetEngagementBoredomScore();
  var FrustrationScore = es.AffectivGetFrustrationScore();
  var ExcitementShortTermScore = es.AffectivGetExcitementShortTermScore();
  var ExcitementLongTermScore = es.AffectivGetExcitementLongTermScore();

  console.log("Engagement: " + EngagementBoredomScore)
  console.log("Frustration: " + FrustrationScore)
  console.log("Short term Excitement: " + ExcitementShortTermScore)
  console.log("Long term Excitement: " + ExcitementLongTermScore)
  
  sendToDatabase(currMsec,
                EngagementBoredomScore,
                FrustrationScore,
                ExcitementShortTermScore,
                ExcitementLongTermScore);

  timer = setTimeout("updateEmoEngine()",50);
}

function sendToDatabase(seconds, EngagementBoredomScore, FrustrationScore, ExcitementShortTermScore, ExcitementLongTermScore){
  $.post("/db/input_eeg_data",
  {
      time: seconds,
      engagement: EngagementBoredomScore,
      frustration: FrustrationScore,
      shorttermexcitement: ExcitementShortTermScore,
      longtermexcitement: ExcitementLongTermScore
  },
  function(data, status){
    console.log("Data: " + data + "\nStatus: " + status)
  });
}

