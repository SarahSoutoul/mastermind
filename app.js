
var computer = [] //color combination of the computer
var user = [] //color combination of the user
var options = document.querySelectorAll('.option') 
var rows = document.getElementsByClassName('guess')
var resultsContainer = document.getElementsByClassName('result')
var computerSlots = document.getElementsByClassName('computer slot')
var blackcount = 0 //indicator for when player gets color and location right
var redcount = 0 // indicator for when player gets color right but NOT LOCATION
var rowIncrement = 1
var resultIncrement = 1
var colors = {
    1:"green",
    2:"purple",
    3:"red",
    4:"yellow"
} //attributing a number to each color

computerCombination(1,4); //call the function with predetermined max and min

//Creates a color combination for the computer 
  function computerCombination (min, max) {
        for (var i = 0; i < 4; i++)
        computer[i] = Math.round(Math.random() * (max - min)) + min;
        //console.log(computer)

     
 }


//insert guess color on row
function insertColor (){

   var self = this;
    var row = rows[rows.length - rowIncrement]
    //console.log("row:",row)
    var color = row.getElementsByClassName('slot'); //get to each row and their slot
     //console.log(color, user.length)
   
    color[user.length].className = color[user.length].className + ' peg ' + self.id; 
    

  
}

function insertPeg (type) {
    var slots = resultsContainer[resultsContainer.length - resultIncrement].getElementsByClassName('result-slot');
    slots[0].className = 'slot ' + type;
  }


//function clickHandler: for users to click on each color and get value of that color. If statement, when user array is still under 4 numbers, keep pushing values to the array. If not, start a new array (aka a new row). When user array gets to 4 values, call compare function. 


function clickHandler () {
    
    for(let i=0;i<options.length; i++){
        let option = options[i]
      
        let value = option.getAttribute('value')
        
        option.addEventListener('click', insertColor)
        option.addEventListener('click', function(){

            if(user.length < 4){
                
                user.push(Number(value))
               // console.log(user)
                

            } else {
                user = []
                blackcount = 0
                redcount = 0
                user.push(Number(value))
              //  console.log(user)

            }

            if(user.length === 4){
            
                compare()
                user = []
                blackcount = 0
                redcount = 0
                rowIncrement += 1;
                resultIncrement +=1;
                
            }
            
            
        })
        
    }
}

//compare computer array with user array. 
//Everytime user gets right color and right location, blackcount increases by 1. When user gets right color but NOT right location, redcount increases by 1. 
//if user wins, clear the board + alert + clear blackcount/redcount/rowincrement/resultincrement

function compare (){
    
    var computerCopy = computer.slice(0)

    for(var i=0; i<computer.length; i++){

        if(computer[i] === user[i]){
           blackcount++
           insertPeg('hit');
           computerCopy[i] = 0 // take out the computer matched color
           user[i] = -1 // to take out the user matched color 
           
        
           if(blackcount === 4){
               alert('WIN')
               clearBoard()
                user = []
                blackcount = 0
                redcount = 0
                rowIncrement = 0;
                resultIncrement =0;
           }
            
        }
    }

    for (var j=0;j<computer.length;j++){
       
        if(computerCopy.indexOf(user[j]) !== -1){
            redcount++

            insertPeg('almost');
            computerCopy[computerCopy.indexOf(user[j])] = 0
            
        }
    }
            

     // console.log('redcount:' + redcount)
     // console.log('blackcount:' + blackcount)
     // console.log('Computer Copy:' + computerCopy)

      if(rowIncrement === 8){
        
        for(var i=0;i<computerSlots.length;i++){
            computerSlots[i].className += ' ' + colors[computer[i]]
        }
        alert('lost')
    }
   
}



function clickButton () {
   var button = document.getElementById('button')
    
    button.addEventListener('click', function(){
        clearBoard()
        user = []
        blackcount = 0
        redcount = 0
        rowIncrement = 1;
        resultIncrement =1;

        for(var i=0;i<computerSlots.length;i++){
            computerSlots[i].className = 'computer slot'
        }
    })
}


//clear entire board
function clearBoard () {
    
    //clear the game board
    for (var i = 0; i < rows.length; i++) {
        //clear out all the rows
        rows[i].innerHTML = '';
        //re create elements in those rows
        for (var j = 0; j < 4; j++) {
          var slot = document.createElement('div');
          slot.className = 'slot';
          rows[i].appendChild(slot);
        
        }
    }

    //clear the results board
    for(var i=0; i<resultsContainer.length; i++){
       //getting to the element slot
        var clearResults = resultsContainer[i].getElementsByClassName('slot');
  
        // setting class back to 'result-slot slot' from 'slot hit'
        for(var j=0; j<4;j++){
           clearResults[j].className = 'result-slot slot'

        }
    }

    computerCombination(1,4);
  
   
}


clickHandler()
clickButton()
