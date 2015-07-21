var engine, es;
var startMsec;

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

  msec = new Date().getTime();
  engine.Connect();
  updateEmoEngine();
});

function updateEmoEngine(){

  engine.ProcessEvents(500);

  var currMsec = getElapsedTime(startMsec);
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
  // setTimeout("updateEmoEngine()",50);
}

function getElapsedTime(startTime){
  currMsec = new Date().getTime();
  return currMsec - startTime;
}

function sendToData(time, EngagementBoredomScore, FrustrationScore, ExcitementShortTermScore, ExcitementLongTermScore){
  pg.connect(process.env.DATABASE_URL, function(err, client, done) {
    client.query('client.query("CREATE TABLE IF NOT EXISTS test_data_1(time float,engagement float,frustration float, shorttermexcitement float, longtermexcitement float)");',
      function(err, result)
    {
        done();
        if (err)
         { console.error(err); response.send("Error " + err); }
        else
         { console.log("table created"); }
    
    });
  });
}


// INSERT INTO test_data_1(
// time, 
// engagement, 
// frustration, 
// shorttermexcitement, 
// longtermexcitement) values
// (0.0,
// 1,
// 1,
// 1,
// 1);
