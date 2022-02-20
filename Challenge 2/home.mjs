function generate(){

let url = 'https://api.thecatapi.com/v1/images/search?size=small&mime_types=gif';


fetch(url)
.then(res => res.json())
  .then(data => {const myImg = data[0].url;
    console.log(myImg);
    var img = document.createElement("img");
    img.src = data[0].url;

    var div = document.getElementById("img-box")
    div.appendChild(img);
    
  }
    );
}


function rpsGame(choice){
  var humanChoice = choice.id, botChoice;
  botChoice = fillBotChoice();
  
  /**console.log(humanChoice+","+botChoice);*/

  var result = winner(humanChoice, botChoice); 

  /**console.log(result);*/

  var message = finalMessage(result)

  /**console.log(message);*/

  rpsFrontEnd(humanChoice, botChoice, message);

}

function fillBotChoice(){
  var rNum = Math.floor(Math.random() * 3);
  if(rNum == 0){
    return 'rock';
  }else if(rNum == 1){
    return 'paper'
  }else{
    return'scissors'
  }
}

function winner(humanChoice, botChoice){
  var rpsDatabase = {
    'rock': {'rock':0.5, 'paper':0, 'scissors':1},
    'paper': {'rock':1, 'paper':0.5, 'scissors':0},
    'scissors': {'rock':0, 'paper':1, 'scissors':0.5}
  }

  var yourScore = rpsDatabase[humanChoice][botChoice];
  var botScore = rpsDatabase[botChoice][humanChoice];

  return [yourScore, botScore];

}

function finalMessage([yourScore, botScore]){
  if(yourScore === 0){
    return {'message': 'You Lost', 'color':'red'};
  }else if(yourScore === 0.5){
    return {'message': 'Tie', 'color':'yellow'};
  }else{
    return {'message': 'You Won', 'color':'green'};
  }
}

function rpsFrontEnd(humanChoice, botChoice, message){
  var imgDatabase = {
    'rock': document.getElementById('rock').src,
    'paper': document.getElementById('paper').src,
    'scissors': document.getElementById('scissors').src,
  }

  // Remove all the images
  document.getElementById('rock').remove();
  document.getElementById('paper').remove();
  document.getElementById('scissors').remove();

   var hDiv = document.createElement('div');
   var mDiv = document.createElement('div');
   var bDiv = document.createElement('div');
   

   hDiv.innerHTML = "<img src='" + imgDatabase[humanChoice] +"' width=280 height=250 style='box-shadow:  0px 10px 50px rgba(187, 53, 142, 0.9);'>";
   mDiv.innerHTML = "<h1 style='color: "+ message['color']+"; font-size: 60px; padding:30px;' >" + message['message'] +"</h1>";
   bDiv.innerHTML = "<img src='" + imgDatabase[botChoice] +"' width=280 height=250 style='box-shadow: 0px 10px 50px rgba(18, 202, 110, 0.9);'>";

  document.getElementById('flex-box-container').appendChild(hDiv);
  document.getElementById('flex-box-container').appendChild(mDiv);
  document.getElementById('flex-box-container').appendChild(bDiv);
}