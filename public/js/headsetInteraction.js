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
var engine, es;
$(document).ready(function(e){ 
  engine = EmoEngine.instance()
  console.log(engine)
  es = new EmoState();

  engine.Connect();
  updateEmoEngine();
});

var lastResponseIndex = -1;
function updateEmoEngine(){   

    engine.ProcessEvents(500);

    console.log("Engagement: " + es.AffectivGetEngagementBoredomScore())
    console.log("Frustration: " + es.AffectivGetFrustrationScore())
    console.log("Short term Excitement: " + es.AffectivGetExcitementShortTermScore())
    console.log("Long term Excitement: " + es.AffectivGetExcitementLongTermScore())

    //Engagement: 0
    if (es.AffectivGetEngagementBoredomScore() > .8 && lastResponseIndex !== 0){
        console.log("Engagement: " + es.AffectivGetEngagementBoredomScore())
        lastResponseIndex = 0
        //plot Engagement
    }
    //Frustration: 1
    if (es.AffectivGetFrustrationScore() > .8 && lastResponseIndex !== 1){
        console.log("Frustration: " + es.AffectivGetFrustrationScore())
        lastResponseIndex = 1
        //plot Frustration
    }
    //Short term excitement: 2
    else if (es.AffectivGetExcitementShortTermScore() > .8 && lastResponseIndex !== 2){
        console.log("Short term Excitement: " + es.AffectivGetExcitementShortTermScore())
        lastResponseIndex = 2
        //plot ShortTerm
    }
    //Long term excitement: 3
    else if (es.AffectivGetExcitementLongTermScore() > .8 && lastResponseIndex !== 3){
        console.log("Long term Excitement: " + es.AffectivGetExcitementLongTermScore())
        lastResponseIndex = 3
        //plot LongTerm
    }
    
    setTimeout("updateEmoEngine()",50);
}

