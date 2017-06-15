(function(){
    var level = 1;
    var totalTimer = 5;
    var gridSize = 3;
    var minimumScore = 5;
    var switchTimer = 10;
    var currentScore = 0;
    var body = document.getElementById("body");
    var header = document.getElementById("variable-header");
    var timerId;
    function Tile(){
        this.highlighted = false;
        
    }
    function init(){
       createTiles(gridSize); 
       createHeader();  
    //   timerEnds();
        var div = document.createElement("div");
        timerId = setInterval(countdown, 1000);
        div.id = "timer";
        var divMin = document.createElement("div");
        divMin.textContent = "Minimum Score: "+minimumScore;
       // div.textContent = "Time Limit: "+totalTimer+"seconds";
       document.getElementById("fix-header").appendChild(div);
         document.getElementById("fix-header").appendChild(divMin);
        
    }
    function countdown() {
        
      if (totalTimer == 0) {
        clearTimeout(timerId);
          var score = localStorage.getItem("score")
           if(currentScore >= minimumScore){
               level++;
               gridSize++;
               if(currentScore > localStorage.getItem("highscore")){
                   localStorage.setItem("highscore",currentScore);
               }
               restart();
           }else{
               var div = document.createElement("div");
               div.className = "play-again";
               div.textContent = "Play Again";
               div.addEventListener("click",restart.bind(null));
               body.innerHTML = "";
               body.appendChild(div);
               showLeaderBoard();
              // alert("Game Over");
           } 
        document.getElementById("timer").innerHTML = totalTimer + ' seconds remaining';
      } else {
        document.getElementById("timer").innerHTML = totalTimer + ' seconds remaining';
        totalTimer--;
      }
    }
    function createTiles(n){
       var randomX =  Math.floor(Math.random()*n);
       var randomY = Math.floor(Math.random()*n);     
       for(var i = 0; i<n; i++){
            var row = document.createElement("div"); 
            row.className = "row"; 
            for(var j = 0; j<n; j++){
                 var div = document.createElement("div");
                var tile = new Tile();
                if(i == randomX && j == randomY){
                    tile.highlighted = true;
                }
                if(tile.highlighted){
                    div.className = "tile-grid selected";
                }else{
                    div.className = "tile-grid";
                }
                div.addEventListener("click",divClicked.bind(null,tile));
                 row.appendChild(div);
            }
            document.getElementById("body").appendChild(row);
        }
    }
    function createHeader(){
        var div = document.createElement("div");
        div.textContent = "Level:"+level;
        var divScore = document.createElement("div");
        divScore.textContent = "Score:"+currentScore;
        header.appendChild(div);
        header.appendChild(divScore);
    }
    function divClicked(tile){
       if(tile.highlighted){
           currentScore++;
           body.innerHTML = "";
           header.innerHTML = "";
           createTiles(gridSize);
           createHeader();
       }else{
       }       
    }
    function randomGrid(n){
        
    }
    function restart(){
           currentScore = 0;
           totalTimer = 5;
           clearTimeout(timerId);
           timerId = setInterval(countdown, 1000);
           body.innerHTML = "";
           header.innerHTML = "";
           createTiles(gridSize);
           createHeader();
          // timerEnds();  
           
    }
    function timerEnds(){
        setTimeout(function(){
            var score = localStorage.getItem("score")
           if(currentScore >= minimumScore){
               level++;
               gridSize++;
               if(currentScore > localStorage.getItem("highscore")){
                   localStorage.setItem("highscore",currentScore);
               }
               restart();
           }else{
               var div = document.createElement("div");
               div.className = "play-again";
               div.textContent = "Play Again";
               div.addEventListener("click",restart.bind(null));
               body.innerHTML = "";
               body.appendChild(div);
               showLeaderBoard();
              // alert("Game Over");
           } 
        }, totalTimer*1000);
    }
    function showLeaderBoard(){
        var score = localStorage.getItem("highscore");
        var div = document.createElement("div");
        div.textContent = "High Score: "+score;
        header.appendChild(div);
    }
    init();
})();