//https://tfhub.dev/tensorflow/tfjs-model/toxicity/1/default/1
// The minimum prediction confidence.
const threshold = 0.9;

let mod;

// Load the model. Users optionally pass in a threshold and an array of labels to include.
toxicity.load(threshold).then(model => {
  
  document.getElementById("loader").classList.add("hide-loader");
  
  document.getElementById("title").innerHTML =
      "Detects if the comment contains toxic content, such as threatening language, insults, obscenities, hatred based on identity, or sexually explicit language. 🔍";
  
  mod = model;
  
  document.getElementById("content").innerHTML=document.getElementById("content").innerHTML+
  "Comment:<br /><textarea id='myTextarea' rows='5' cols='40'></textarea><p>Click the button to get the comment analysis.</p><button type='button' onclick='myFunction()'>Detect</button><p id='demo'></p>";
}).catch(err => {
  document.getElementById("content").innerHTML = "Ops! 😐 \n"+err;
});

function myFunction() {
  document.getElementById("loader").classList.remove("hide-loader");

  document.getElementById("demo").innerHTML="";

  var x = document.getElementById("myTextarea").value;

  const sentences = [x];

  mod.classify(sentences).then(predictions => {
    // `predictions` is an array of objects, one for each prediction head,
    // that contains the raw probabilities for each input along with the
    // final prediction in `match` (either `true` or `false`).
    // If neither prediction exceeds the threshold, `match` is `null`.
    
    for (const x of predictions) {
      if(x.results[0].match === true){
        var pill = document.createElement("DIV");
        pill.classList.add("pill");
        pill.innerHTML = x.label.replace("_", " ");;
        document.getElementById("demo").appendChild(pill);
      }
    }
    if (document.getElementById("demo").innerHTML === "") {
      document.getElementById("demo").innerHTML = "No matches 😊";
    }
    document.getElementById("loader").classList.add("hide-loader");
  }).catch(err => {
    document.getElementById("demo").innerHTML = "Ops! 😐 \n"+err;
  });
}