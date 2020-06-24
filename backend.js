console.log("We are in backend");

// Some necessary global variables

let board = [ [ '' , '' , '' ] , [ '' , '' , '' ] , [ '' , '' , '' ] ];

let human = 'X' , ai = 'O' , choice ;

let curX , curY , result = null ;

let user = 0 , easy = 0 ;

let X = 0 , O = 0 , Tie = 0 ;

let curPlayer = human , startPlayer = human ;


// To give the starting heading color
swapHeadingColor() ;

// It Gives Index From Position Id
function giveCurIndex( position ) {
    
  if( position == 'P00'){

      curX = 0 ; curY = 0 ;
  }

  if( position == 'P01'){

      curX = 0 ; curY = 1 ;
  }

  if( position == 'P02'){

      curX = 0 ; curY = 2 ;
  }

  if( position == 'P10'){

      curX = 1 ; curY = 0 ;
  }

  if( position == 'P11'){

      curX = 1 ; curY = 1 ;
  }

  if( position == 'P12'){

      curX = 1 ; curY = 2 ;
  }

  if( position == 'P20'){

      curX = 2 ; curY = 0 ;
  }

  if( position == 'P21'){

      curX = 2 ; curY = 1 ;
  }

  if( position == 'P22'){

      curX = 2 ; curY = 2 ;
  }
}

// Function To put the symbols with Fixed color boxes
function putSymbol( symbol ) {
    
    let template ;

    if( result ) template = `<h1 class="card-body" style="color: #F36747;">${result}</h1>` ;

    else if( symbol == 'X' ) template = `<h1 class="card-body" style="color: #3e9322;">X</h1>` ;

    else if( symbol == 'O' ) template = `<h1 class="card-body" style="color: #585d60;">O</h1>` ;

    else template = `` ;

    if( curX == 0 && curY == 0 ) document.getElementById('P00').innerHTML = template ;

    if( curX == 0 && curY == 1 ) document.getElementById('P01').innerHTML = template ;

    if( curX == 0 && curY == 2 ) document.getElementById('P02').innerHTML = template ;

    if( curX == 1 && curY == 0 ) document.getElementById('P10').innerHTML = template ;

    if( curX == 1 && curY == 1 ) document.getElementById('P11').innerHTML = template ;

    if( curX == 1 && curY == 2 ) document.getElementById('P12').innerHTML = template ;

    if( curX == 2 && curY == 0 ) document.getElementById('P20').innerHTML = template ;

    if( curX == 2 && curY == 1 ) document.getElementById('P21').innerHTML = template ;

    if( curX == 2 && curY == 2 ) document.getElementById('P22').innerHTML = template ;
}

// It Checks If The Given Three Position Contains Same Placeholders
function equal( a , b , c ) {

    return ( a != '' && a == b && b == c ) ;
}

// It Checks All The Row , Column and Diagonal , and Return If Someone is Winning Or Draw 
function checkWinner() {

    choice = null;
  
    // Checking Row
    for ( let i = 0 ; i < 3 ; i++ )
    
        if ( equal( board[i][0] , board[i][1] , board[i][2] ) ) choice = board[i][0] ;
  
    // Checking Column
    for ( let i = 0 ; i < 3 ; i++ )
    
        if ( equal( board[0][i] , board[1][i] , board[2][i] ) ) choice = board[0][i] ;
        
    // Checking Diagonal
    if ( equal( board[0][0] , board[1][1] , board[2][2] ) ) choice = board[0][0] ;

    if ( equal( board[2][0] , board[1][1] , board[0][2] ) )choice = board[2][0] ;

    // Checking tie
    let blankSpots = 0 ;

    for ( let i = 0 ; i < 3 ; i++ ) {

      for ( let j = 0 ; j < 3 ; j++ )

        if ( board[i][j] == '' ) blankSpots++ ;
    }

    // Returning result
    if ( choice == null && blankSpots == 0 ) return 'tie' ;
    
    else return choice ;
}

// It Finds The Best Move For Computer and Put O There
function bestMove() {

    // AI to make its turn
    let bestScore = -100000 ;

    let move ;

    for ( let i = 0 ; i < 3 ; i++ ) {

      for (let j = 0; j < 3; j++) {

        // Is the spot available?
        if ( board[i][j] == '' ) {

          board[i][j] = ai ;

          let score = minimax( board , 0 , false ) ;

          board[i][j] = '' ;

          if ( score > bestScore ) {

            bestScore = score ;

            curX = i ;

            curY = j ;
          }
        }
      }
    }

    board[curX][curY] = ai ;

    moveSound() ;

    putSymbol('O') ;

    curPlayer = human ;

    swapHeadingColor() ;

    showResult() ;
}

// This Is The Definition Of Scores Getting From MiniMax Algorihtm's States
let scores = {
    X: -1,
    O: 1,
    tie: 0
};
  
// The MiniMax Algorithm
function minimax( board , depth , isMaximizing ) {

    let tempResult = checkWinner();

    if ( tempResult != null ) return scores[tempResult] ;
  
    if ( isMaximizing ) {

      let bestScore = -100000 ;

      for ( let i = 0 ; i < 3 ; i++ ) {

        for ( let j = 0 ; j < 3 ; j++ ) {

          // Is the spot available?
          if ( board[i][j] == '' ) {

            board[i][j] = ai ;

            let score = minimax( board , depth + 1 , false ) ;

            board[i][j] = '' ;

            bestScore = Math.max( score , bestScore ) ;
          }
        }
      }

      return bestScore ;
    } 
    
    else {

      let bestScore = 100000 ;

      for ( let i = 0 ; i < 3 ; i++ ) {

        for ( let j = 0 ; j < 3 ; j++ ) {
          
          // Is the spot available?
          if ( board[i][j] == '' ) {

            board[i][j] = human ;

            let score = minimax( board , depth + 1 , true ) ;

            board[i][j] = '' ;

            bestScore = Math.min( score , bestScore ) ;
          }
        }
      }

      return bestScore ;
    }
}

// This function will give red color to the winner box
function colorWinner() {
    
    for ( let i = 0 ; i < 3 ; i++ ){
    
        if ( equal( board[i][0] , board[i][1] , board[i][2] ) ){
            
            curX = i ; curY = 0 ;

            putSymbol( result ) ;

            curX = i ; curY = 1 ;

            putSymbol( result ) ;

            curX = i ; curY = 2 ;

            putSymbol( result ) ;
        }
    }
  
    // Checking Column
    for ( let i = 0 ; i < 3 ; i++ ){
    
        if ( equal( board[0][i] , board[1][i] , board[2][i] ) ){
            
            curX = 0 ; curY = i ;

            putSymbol( result ) ;

            curX = 1 ; curY = i ;

            putSymbol( result ) ;

            curX = 2 ; curY = i ;

            putSymbol( result ) ;
        }
    }
  
    // Checking Diagonal
    if ( equal( board[0][0] , board[1][1] , board[2][2] ) ){

        curX = 0 ; curY = 0 ;

        putSymbol( result ) ;

        curX = 1 ; curY = 1 ;

        putSymbol( result ) ;

        curX = 2 ; curY = 2 ;

        putSymbol( result ) ;
    }

    if ( equal( board[2][0] , board[1][1] , board[0][2] ) ){
        
        curX = 2 ; curY = 0 ;

        putSymbol( result ) ;

        curX = 1 ; curY = 1 ;

        putSymbol( result ) ;

        curX = 0 ; curY = 2 ;

        putSymbol( result ) ;
    }
}

// It Plays Final Sound
function finalSound() {
    
    var audio = new Audio('./sounds/final.mp3');
            
    audio.play();
}

// It Plays Moves Sound
function moveSound() {
    
    var audio = new Audio('./sounds/move.mp3');
            
    audio.play();  
}

// It Plays Begining Sound
function beginingSound() {
    
    var audio = new Audio('./sounds/begining.mp3');
            
    audio.play(); 
}

// It Shows The Result
function showResult() {

    result = checkWinner() ;

    if ( result != null ){

        finalSound() ;

        clearScoreBoardColor() ;

        if( result == 'tie' ){

            Tie++ ;

            document.getElementById('TieBox').setAttribute('style' , 'background: #F36747;') ;

            document.getElementById('TieHeading').setAttribute('style' , 'background: #F36747;') ;

            document.getElementById('putTieValue').setAttribute('style' , 'background: #F36747;') ;

            document.getElementById('putTieValue').innerHTML = `${Tie}` ;
        }

        else if( result == 'X' ){

            X++ ;

            colorWinner() ;

            document.getElementById('XBox').setAttribute('style' , 'background: #F36747;') ;

            document.getElementById('XHeading').setAttribute('style' , 'background: #F36747;') ;

            document.getElementById('putXValue').setAttribute('style' , 'background: #F36747;') ;

            document.getElementById('putXValue').innerHTML = `${X}` ;
        }

        else{

            O++ ;

            colorWinner() ;

            document.getElementById('OBox').setAttribute('style' , 'background: #F36747;') ;

            document.getElementById('OHeading').setAttribute('style' , 'background: #F36747;') ;

            document.getElementById('putOValue').setAttribute('style' , 'background: #F36747;') ;

            document.getElementById('putOValue').innerHTML = `${O}` ;
        }
    }
}

// This Will Clear The Current ScoreBoard Representing Colours
function clearScoreBoardColor() {
    
    document.getElementById('TieBox').setAttribute('style' , 'background: #44bbaa;') ;

    document.getElementById('TieHeading').setAttribute('style' , 'background: #44bbaa;') ;

    document.getElementById('putTieValue').setAttribute('style' , 'background: #44bbaa;') ;

    document.getElementById('XBox').setAttribute('style' , 'background: #44bbaa;') ;

    document.getElementById('XHeading').setAttribute('style' , 'background: #44bbaa;') ;

    document.getElementById('putXValue').setAttribute('style' , 'background: #44bbaa;') ;

    document.getElementById('OBox').setAttribute('style' , 'background: #44bbaa;') ;

    document.getElementById('OHeading').setAttribute('style' , 'background: #44bbaa;') ;

    document.getElementById('putOValue').setAttribute('style' , 'background: #44bbaa;') ;
}

// This Will Swap The Heading Color Of The ScoreBoard
function swapHeadingColor() {

    if( curPlayer == human ){

        document.getElementById('OHeading').setAttribute('style' , 'background: #44bbaa;') ;

        document.getElementById('XHeading').setAttribute('style' , 'background: #5bc538; color: white;') ;
    }

    else{

        document.getElementById('OHeading').setAttribute('style' , 'background: #585d60; color: white;') ;

        document.getElementById('XHeading').setAttribute('style' , 'background: #44bbaa;') ;
    }
    
}

// It Gives Replay
function replay() {

    result = null ;

    beginingSound() ;

    clearScoreBoardColor() ;
    
    for( let i = 0 ; i < 3 ; i++ ){

        for( let j = 0 ; j < 3 ; j++ ){

            board[i][j] = '' ;

            curX = i ;  curY = j ;

            putSymbol('') ;
        }
    }

    if( startPlayer == human ){

        startPlayer = ai ;

        curPlayer = ai ;
    }

    else{

        startPlayer = human ;

        curPlayer = human ;
    }

    swapHeadingColor() ;

    if( curPlayer == ai && user == 0 ) setTimeout( bestMove , 600 ) ;
}

function setScoreBoard() {

    X = 0 ; O = 0 ; Tie = 0 ;

    document.getElementById('putTieValue').innerHTML = `${Tie}` ;

    document.getElementById('putXValue').innerHTML = `${X}` ; 

    document.getElementById('putOValue').innerHTML = `${O}` ;
}

// When User Chooses The User Version
function giveUser( clicked_id ) {

    giveCurIndex( clicked_id ) ;

    if( board[curX][curY] == '' && result == null ){

        if( curPlayer == human ){

            board[curX][curY] = human ;

            moveSound() ;

            putSymbol('X') ;

            curPlayer = ai ;

            swapHeadingColor() ;

            showResult() ;
        }

        else{

            board[curX][curY] = ai ;

            moveSound() ;

            putSymbol('O') ;
            
            curPlayer = human ;

            swapHeadingColor() ;

            showResult() ;
        }
    }
}

// It Gives A Random Move For The Easy Version
function randomMove() {

    let availableSpot = [] ;

    for( let i = 0 ; i < 3 ; i++ ){

        for( let j = 0 ; j < 3 ; j++ ){

            if( board[i][j] == '' ){

                var choose = {
                    x : 0 ,
                    y : 0
                }

                choose.x = i ;

                choose.y = j ;
              
                availableSpot.push( choose ) ;
            }
        }
    }

    choose = availableSpot[ Math.floor( Math.random() * availableSpot.length ) ] ;
  
    curX = choose.x ;

    curY = choose.y ;

    board[curX][curY] = ai ;

    moveSound() ;

    putSymbol('O') ;

    curPlayer = human ;

    swapHeadingColor() ;

    showResult() ;
}

// When User Chooses The Easy Version Then This Function Runs
function giveEasy( clicked_id ) {
  
    giveCurIndex( clicked_id ) ;

    if ( curPlayer == human && result == null ) {
            
        // If valid turn
        if ( board[curX][curY] == '' ) {

            board[curX][curY] = human ;

            moveSound() ;

            putSymbol('X') ;

            curPlayer = ai;
          
            showResult() ;

            if( result == null ){

                swapHeadingColor() ;

                setTimeout( randomMove , 600 ) ;
            }
        }
    }
}

// When User Chooses The Hard Version Then This Function Runs
function giveHard( clicked_id ) {
  
    giveCurIndex( clicked_id ) ;

    if ( curPlayer == human && result == null ) {
            
            // If valid turn
        if ( board[curX][curY] == '' ) {

            board[curX][curY] = human;

            moveSound() ;

            putSymbol('X') ;

            curPlayer = ai;
          
            showResult() ;

            if( result == null ){

                swapHeadingColor() ;

                setTimeout( bestMove , 600 ) ;
            }
        }
    }
}

// When User Click On Some Box, Then This Functions Runs
function giveCross( clicked_id ) {
    
    if( user ) giveUser( clicked_id ) ;

    else if( easy ) giveEasy( clicked_id ) ;
    
    else giveHard( clicked_id ) ;
}

// This will set the current version color white
function setVersionColor( clicked_id ) {
    
    document.getElementById('Easy').setAttribute('style' , 'background-color: #44bbaa;') ;
    document.getElementById('Hard').setAttribute('style' , 'background-color: #44bbaa;') ;
    document.getElementById('Multi').setAttribute('style' , 'background-color: #44bbaa;') ;

    document.getElementById( clicked_id ).setAttribute('style' , 'background-color: white;') ;
}

// This Will Set The Current Version Of The Game
function setVersion( clicked_id ) {

    // To give the starting sound
    beginingSound() ;

    setVersionColor( clicked_id ) ;

    startPlayer = ai ;

    replay() ;
    
    if( user == 0 ){

        if( clicked_id == 'Easy' ) easy = 1 ;

        else if( clicked_id == 'Multi' ){
            
            user = 1 ;

            easy = 0 ;

            setScoreBoard() ;
        }

        else easy = 0 ;
    }

    else{

        if( clicked_id == 'Easy' ){

            user = 0 ;

            easy = 1 ;

            setScoreBoard() ;
        }

        else if( clicked_id == 'Hard' ){

            user = 0 ;

            setScoreBoard() ;
        }
    }
}
