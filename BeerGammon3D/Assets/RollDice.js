#pragma strict

var rotSpeed : float = 10.0; // degrees per second

var dieMovedFromRestPosition : boolean = false;
var diceStoppedAfterRoll : boolean = false;

var die1 : GameObject;
var die2 : GameObject;
var die3 : GameObject;
var die4 : GameObject;

var clearDiceTimer : float = 0.0;
var nextRollTimer : float = 0.0;
var turnNoticeTimer : float = 0.0;


/*************************
/Needed to access external object instances
**************************/
var updateTextGameObject : GameObject;
var updateText;

var die1ValueGameObject : GameObject;
var die1Value;

var die2ValueGameObject : GameObject;
var die2Value;



function Awake() {
	updateTextGameObject = new GameObject("utgo");
	updateText = updateTextGameObject.AddComponent(UpdateTextPanel);
	
	die1ValueGameObject = new GameObject("d1v");
	die1Value = die1ValueGameObject.AddComponent(DieValue1);
	
	die2ValueGameObject = new GameObject("d2v");
	die2Value = die2ValueGameObject.AddComponent(DieValue2);
} 
 
function Update() {

	var die1:GameObject;
	var die2:GameObject;
	var trail:GameObject;
	
	var touch : Touch;
	
	/*************************
    /CLEAR DICE TIMER
    /*************************/
	
	if (clearDiceTimer > 0){
		clearDiceTimer -= Time.deltaTime;
	}else if (clearDiceTimer < 0) {
		clearDiceTimer = 0;
		clearDice();
	}
	
	/*************************
    /NEXT ROLL TIMER
    /*************************/
	
	if (nextRollTimer > 0){
		nextRollTimer -= Time.deltaTime;
	}else if (nextRollTimer < 0) {
		nextRollTimer = 0;
		nextRoll();
	}
	
	/*************************
    /TURN NOTICE TIMER
    /*************************/
	
	if (turnNoticeTimer > 0){
		turnNoticeTimer -= Time.deltaTime;
	}else if (turnNoticeTimer < 0) {
		turnNoticeTimer = 0;
		turnNotice();
	}
	
	/*************************
    /GET DICE READY FOR ROLL
    /*************************/

	prepareForRoll();
	
	/*************************
    /SPIN DICE
    /*************************/
		
	spinDice();
	
	/*************************
    /DICE ROLLED FOR MOVE OR FOR NUMBER
    /*************************/
	
	rolledForMoveOrNumber();
	
	/*************************
    /DICE ROLLED TO SEE WHO GOES FIRST
    /*************************/
	
	rolledForTurn();
	
	/*************************
    /ROLL THE DICE
    /*************************/
	
	swipeRoll();    
    
    /*************************
    /CLEAR THE DICE
    /*************************/
    
    swipeClear();
   
}
/*
function OnMouseDown() {
	roll();
}
*/
function clearDice() {
	GameState.readyToClear = true;
}

function nextRoll() {
	if (!GameState.player2Turn && !GameState.player1Turn) {
		GameState.player1Turn = true;
	}
	GameState.preRoll = true;
}

function turnNotice() {
	if (GameState.initialPlayer1Roll2 == 0) { //Still on first set of rolls
    	if (GameState.initialPlayer1Roll1 > GameState.initialPlayer2Roll1) {
            //Player 1 goes first
            (updateText as UpdateTextPanel).SetMiddleText("Player 1 goes first!");
			(updateText as UpdateTextPanel).ShowTextPanelShort();
            GameState.player1IsMoving = true;
             
        }else if (GameState.initialPlayer1Roll1 < GameState.initialPlayer2Roll1) {
            //Player 2 goes first
            (updateText as UpdateTextPanel).SetMiddleText("Player 2 goes first!");
			(updateText as UpdateTextPanel).ShowTextPanelShort();
            GameState.player2IsMoving = true;
           
        }else{
            (updateText as UpdateTextPanel).SetMiddleText("Tied!  Keep Rolling!");
			(updateText as UpdateTextPanel).ShowTextPanelShort();
			GameState.player1Turn = true;
	        GameState.player2Turn = false;
			nextRollTimer = 3.0;
            //Tied, Players roll their second die
        }
    }else{  //Second Rolls have happened
        if (GameState.initialPlayer1Roll2 > GameState.initialPlayer2Roll2) {
            //Player 1 goes first
            (updateText as UpdateTextPanel).SetMiddleText("Player 1 goes first!");
			(updateText as UpdateTextPanel).ShowTextPanelShort();
            GameState.player1IsMoving = true;
            
        }else if (GameState.initialPlayer1Roll2 < GameState.initialPlayer2Roll2) {
            //Player 2 goes first
            (updateText as UpdateTextPanel).SetMiddleText("Player 2 goes first!");
			(updateText as UpdateTextPanel).ShowTextPanelShort();
            GameState.player2IsMoving = true;
           
        }else{
            //Tied, clear dice and start over rolling to see who goes first
            (updateText as UpdateTextPanel).SetMiddleText("Still Tied! Roll again!");
			(updateText as UpdateTextPanel).ShowTextPanelShort();
			GameState.initialPlayer1Roll1 = 0;
			GameState.initialPlayer1Roll2 = 0;
			GameState.initialPlayer2Roll1 = 0;
			GameState.initialPlayer2Roll2 = 0;
			die1 = GameObject.Find("Player1Die1");
			die2 = GameObject.Find("Player1Die2");
			die3 = GameObject.Find("Player2Die1");
			die4 = GameObject.Find("Player2Die2");
			die1.transform.localPosition = MasterPositionMap.player1Die1RestPosition;
			die2.transform.localPosition = MasterPositionMap.player1Die2RestPosition;
			die3.transform.localPosition = MasterPositionMap.player2Die1RestPosition;
			die4.transform.localPosition = MasterPositionMap.player2Die2RestPosition;
			GameState.player1Turn = true;
			GameState.player2Turn = false;
            nextRollTimer = 3.0;
         }
    }
}

function prepareForRoll() {
	if ((GameState.preRoll) && (GameState.player1Turn) && (!dieMovedFromRestPosition)) {
		
		die1 = GameObject.Find("Player1Die1");
		die2 = GameObject.Find("Player1Die2");
		
		//move dice to roll position
		
		die1.rigidbody.useGravity = false;
		die2.rigidbody.useGravity = false;
		
		if (GameState.initialPlayer1Roll1 == 0) {
			die1.transform.localPosition = MasterPositionMap.player1Die1RollPosition;
			if (!GameState.rollForTurn) {
				die2.transform.localPosition = MasterPositionMap.player1Die2RollPosition;
			}
		}else{
			die2.transform.localPosition = MasterPositionMap.player1Die2RollPosition;
		}
		
		dieMovedFromRestPosition = true;
		diceStoppedAfterRoll = false;
		
	}else if ((GameState.preRoll) && (GameState.player2Turn) && (!dieMovedFromRestPosition)) {
	
		die1 = GameObject.Find("Player2Die1");
		die2 = GameObject.Find("Player2Die2");
		
		//move dice to roll position
		
		die1.rigidbody.useGravity = false;
		die2.rigidbody.useGravity = false;
		
		if (GameState.initialPlayer2Roll1 == 0)  {
			die1.transform.localPosition = MasterPositionMap.player2Die1RollPosition;
			if (!GameState.rollForTurn) {
				die2.transform.localPosition = MasterPositionMap.player2Die2RollPosition;
			}
		}else{
			die2.transform.localPosition = MasterPositionMap.player2Die1RollPosition;
		}
		
		dieMovedFromRestPosition = true;
		diceStoppedAfterRoll = false;
		
	}	
}

function spinDice() {
	if ((GameState.preRoll) && ((GameState.player1Turn) || (GameState.player2Turn))) {
		
		if(GameState.player1Turn){
			die1 = GameObject.Find("Player1Die1");
			die2 = GameObject.Find("Player1Die2");
		}else{
			die1 = GameObject.Find("Player2Die1");
			die2 = GameObject.Find("Player2Die2");
		}	
		
		if (GameState.player1Turn) {			
			if (GameState.initialPlayer1Roll1 == 0) {
				die1.transform.Rotate(Random.Range(0,360), rotSpeed * Time.deltaTime, 15, Space.World); 		
			}
	 		if ((!GameState.rollForTurn) || (GameState.initialPlayer1Roll1 > 0)) {
	 			die2.transform.Rotate(Random.Range(0,360), rotSpeed * Time.deltaTime, 15, Space.World);
	 		}
	 	}else{
	 		if (GameState.initialPlayer2Roll1 == 0) {
	 			die1.transform.Rotate(Random.Range(0,360), rotSpeed * Time.deltaTime * -1, 15, Space.World); 
	 		}		
	 		if ((!GameState.rollForTurn)|| (GameState.initialPlayer2Roll1 > 0) ) {
	 			die2.transform.Rotate(Random.Range(0,360), rotSpeed * Time.deltaTime * -1, 15, Space.World);
	 		}
	 	}
	}
}

function rolledForMoveOrNumber() {
	if ((!GameState.preRoll) && ((GameState.player1Turn) || (GameState.player2Turn)) && (!diceStoppedAfterRoll)  && (!GameState.rollForTurn)) {
		
		if (GameState.player1Turn) {
			die1 = GameObject.Find("Player1Die1");
			die2 = GameObject.Find("Player1Die2");
		}else{
			die1 = GameObject.Find("Player2Die1");
			die2 = GameObject.Find("Player2Die2");
		}
		
		
		
		if ((die1.rigidbody.IsSleeping()) && (die2.rigidbody.IsSleeping()))  {
			var total : int;
			die1.rigidbody.mass = 3;
			die2.rigidbody.mass = 3;
			if ( (die1.transform.localPosition.y < 0.865)  || (die1.transform.localPosition.y > 0.866) || 
					(die2.transform.localPosition.y < 0.865) || (die2.transform.localPosition.y > 0.866)) {
				//call visuals for rolled dice
				(updateText as UpdateTextPanel).SetDiceValue(0,0);
				(updateText as UpdateTextPanel).SetMiddleText("Sloppy Dice!!!");
				(updateText as UpdateTextPanel).ShowTextPanelShort();
				diceStoppedAfterRoll = true;
				nextRollTimer = 3.0;
			}else{
				//good roll
				//call visuals for rolled dice
				if (GameState.rollForNumbers) {
					(updateText as UpdateTextPanel).SetDiceValue( (die1Value as DieValue1).currentValue, (die2Value as DieValue2).currentValue);					
					total = (die1Value as DieValue1).currentValue + (die2Value as DieValue2).currentValue;
					if (GameState.player1Turn) {
						(updateText as UpdateTextPanel).SetTopText("Player 1's number is " + total);
						GameState.player1Number = total;
					}else{
						(updateText as UpdateTextPanel).SetTopText("Player 2's number is " + total);
						GameState.player2Number = total;
					}
					(updateText as UpdateTextPanel).ShowTextPanel();
					diceStoppedAfterRoll = true;
					clearDiceTimer = 3.0;
					
				}else{
					(updateText as UpdateTextPanel).SetDiceValue( (die1Value as DieValue1).currentValue, (die2Value as DieValue2).currentValue);
					total = (die1Value as DieValue1).currentValue + (die2Value as DieValue2).currentValue;
					if (GameState.player1Turn) {
						(updateText as UpdateTextPanel).SetTopText("Player 1 Rolled");
						diceStoppedAfterRoll = true;
						GameState.player1IsMoving = true;
					}else{
						(updateText as UpdateTextPanel).SetTopText("Player 2 Rolled");
						diceStoppedAfterRoll = true;
						GameState.player2IsMoving = true;
					}
					GameState.currentRollTotal = total;
					(updateText as UpdateTextPanel).ShowTextPanel();						
				}			
			}			
			
		}
				
	}
}

function rolledForTurn() {
	if ( (!GameState.preRoll) && ((GameState.player1Turn) || (GameState.player2Turn)) && (!diceStoppedAfterRoll)  && (GameState.rollForTurn) ) {
		
		if (GameState.player1Turn) {
			die1 = GameObject.Find("Player1Die1");
			die2 = GameObject.Find("Player1Die2");
		}else{
			die1 = GameObject.Find("Player2Die1");
			die2 = GameObject.Find("Player2Die2");
		}
		
		if ((die1.rigidbody.IsSleeping()) && (die2.rigidbody.IsSleeping()))  {
			die1.rigidbody.mass = 3;
			die2.rigidbody.mass = 3;
			if ( (die1.transform.localPosition.y < 0.865)  || (die1.transform.localPosition.y > 0.866) || 
					(die2.transform.localPosition.y < 0.865) || (die2.transform.localPosition.y > 0.866)) {
			/*FORCE SLOPPY FOR TEST*/
			/*if ( (die1.transform.localPosition.y < 0.965)  || (die1.transform.localPosition.y > 0.866) || 
					(die2.transform.localPosition.y < 0.865) || (die2.transform.localPosition.y > 0.866)) {*/
				(updateText as UpdateTextPanel).SetMiddleText("Sloppy Dice!!!");
				(updateText as UpdateTextPanel).ShowTextPanelShort();
				nextRollTimer = 3.0;
			}else{
				if (GameState.player1Turn) { 
					if (GameState.initialPlayer1Roll1 == 0) {
						GameState.initialPlayer1Roll1 = (die1Value as DieValue1).currentValue;
						(updateText as UpdateTextPanel).SetDiceValue( (die1Value as DieValue1).currentValue, 0);
					}else{
						GameState.initialPlayer1Roll2 = (die2Value as DieValue2).currentValue;
						(updateText as UpdateTextPanel).SetDiceValue( (die2Value as DieValue2).currentValue, 0);
					}
					(updateText as UpdateTextPanel).SetTopText("Player 1 Rolled");
				}else{					
					if (GameState.initialPlayer2Roll1 == 0) {
						GameState.initialPlayer2Roll1 = (die1Value as DieValue1).currentValue;
						(updateText as UpdateTextPanel).SetDiceValue( (die1Value as DieValue1).currentValue, 0);
					}else{
						GameState.initialPlayer2Roll2 = (die2Value as DieValue2).currentValue;
						(updateText as UpdateTextPanel).SetDiceValue( (die2Value as DieValue2).currentValue, 0);
					}
					(updateText as UpdateTextPanel).SetTopText("Player 2 Rolled");
				}
				(updateText as UpdateTextPanel).ShowTextPanel();
				
				if (GameState.player1Turn) {
	            	GameState.player1Turn = false;
	            	GameState.player2Turn = true;
	            	nextRollTimer = 1.0;
	            }else{
	            	turnNoticeTimer = 3.0;
            	}
				
			}
			diceStoppedAfterRoll = true;
			
            GameState.waitingOnPlayer = false;    
            
                 
            //nextRollTimer = 1.0;
			//clearDiceTimer = 4.0;
		}
	}
}

function swipeRoll() {
	if ((Input.touchCount == 1) && ( (GameState.player1Turn) || (GameState.player2Turn)) && (!GameState.readyToClear))
    {
        var touch = Input.GetTouch(0);
        
 		var trail = GameObject.Find("Trail");
        trail.transform.localPosition = touch.position;
        
        if ((touch.phase == TouchPhase.Moved) && (GameState.preRoll))
        {
            roll();
        }
    }
}

function swipeClear() {
	if ((Input.touchCount == 1) && ( (GameState.player1Turn) || (GameState.player2Turn)) && (GameState.readyToClear))
    {
        var touch = Input.GetTouch(0);
        
        var trail = GameObject.Find("Trail");
        trail.transform.localPosition = touch.position;
 
        if (touch.phase == TouchPhase.Moved)
        {
            
            if (GameState.player1Turn) {
				die1 = GameObject.Find("Player1Die1");
				die2 = GameObject.Find("Player1Die2");
			}else{
				die1 = GameObject.Find("Player2Die1");
				die2 = GameObject.Find("Player2Die2");
			}
            
            if (GameState.player1Turn) {
            			
            	die1.transform.localPosition = MasterPositionMap.player1Die1RestPosition;
				if (!GameState.rollForTurn) {
					
					die2.transform.localPosition = MasterPositionMap.player1Die2RestPosition;
				}
            }else{
            	
            	die1.transform.localPosition = MasterPositionMap.player2Die1RestPosition;
				if (!GameState.rollForTurn) {
					
					die2.transform.localPosition = MasterPositionMap.player2Die2RestPosition;
				}
            }
            
            if (GameState.player1Turn) {
            	if (GameState.player1Number > 0) {
            		GameState.player1Turn = false;
            		GameState.player2Turn = true;
            	}
            }else{
            	if (GameState.player2Number > 0) {
	            	if (GameState.rollForNumbers) {
	            		GameState.rollForNumbers = false;	            		
	            		(updateText as UpdateTextPanel).SetMiddleText("Roll to see who goes first");
						(updateText as UpdateTextPanel).ShowTextPanelShort();
						GameState.rollForTurn = true;
	            	}else if (GameState.rollForTurn) {
	            		GameState.rollForTurn = false;
	            	}
	            	GameState.player2Turn = false;
	            	//GameState.player1Turn = true;
	            }
            }
            
            GameState.readyToClear = false;
            GameState.waitingOnPlayer = false;            
            nextRollTimer = 1.0;
            
        }
    }
}

function roll() {

	GameState.preRoll = false;
	
	dieMovedFromRestPosition = false;
	
	var die1:GameObject;
	var die2:GameObject;
	
	if (GameState.player1Turn) {
		die1 = GameObject.Find("Player1Die1");
		die2 = GameObject.Find("Player1Die2");
	}else {
		die1 = GameObject.Find("Player2Die1");
		die2 = GameObject.Find("Player2Die2");
	}
	
	die1.rigidbody.WakeUp();
	die2.rigidbody.WakeUp();
	die1.rigidbody.isKinematic = false;	
	die2.rigidbody.isKinematic = false;
	die1.rigidbody.useGravity = true;
	die2.rigidbody.useGravity = true;
	
	
	if (GameState.player1Turn) {
		if (GameState.initialPlayer1Roll1 == 0)  {
			die1.rigidbody.mass = 2.5;
			die1.rigidbody.AddForce(Random.Range(-50,-50),Random.Range(0,-5),Random.Range(-6,6),ForceMode.Impulse);
			die1.rigidbody.AddTorque(Random.Range(-15,-20),Random.Range(3,-20),Random.Range(-4,4),ForceMode.Impulse);
		}
		if ((!GameState.rollForTurn) || (GameState.initialPlayer1Roll1 > 0)) {
			die2.rigidbody.mass = 2.5;
			die2.rigidbody.AddForce(Random.Range(-50,-50),Random.Range(0,-5),Random.Range(-6,6),ForceMode.Impulse);
			die2.rigidbody.AddTorque(Random.Range(-15,-20),Random.Range(3,-20),Random.Range(-4,4),ForceMode.Impulse);
		}
	}else{
		if (GameState.initialPlayer2Roll1 == 0) {
			die1.rigidbody.mass = 2.5;
			die1.rigidbody.AddForce(Random.Range(50,50),Random.Range(0,-5),Random.Range(-6,6),ForceMode.Impulse);
			die1.rigidbody.AddTorque(Random.Range(15,20),Random.Range(3,-20),Random.Range(-4,4),ForceMode.Impulse);
		}
		if ((!GameState.rollForTurn) || (GameState.initialPlayer2Roll1 > 0)) {
			die2.rigidbody.mass = 2.5;
			die2.rigidbody.AddForce(Random.Range(50,50),Random.Range(0,-5),Random.Range(-6,6),ForceMode.Impulse);
			die2.rigidbody.AddTorque(Random.Range(15,20),Random.Range(3,-20),Random.Range(-4,4),ForceMode.Impulse);
		}
	}	
}
