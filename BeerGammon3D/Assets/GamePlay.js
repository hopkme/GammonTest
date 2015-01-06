#pragma strict

/*************************
/Needed to access external object instances
**************************/
var updateTextGameObject : GameObject;
var updateText;



function Awake() {
	updateTextGameObject = new GameObject("utgo");
	updateText = updateTextGameObject.AddComponent(UpdateTextPanel);
	
	//Set the board skin
}

function Update () {
	//print("GamePlay");
	if (!GameState.waitingOnPlayer) {
	
		if(GameState.gameStart) {
			gameStart();
		}	
	}
	
	if (GameState.player1IsMoving) {
		//Calculate Possible Moves
		/*
		
			Dave
			
			This is the event where we will set off your logic for calculating possible moves.
			
			I'm assuming you will have a different class, which is fine.
			
			Once the player has finished making their move, simply set:
			
			GameState.readyToClear = true;
			
			This will fire of the necessary events to move to the next player.
			
			Anything global that you need to set for game status, use the GameState script.
			
			The UpdateTextPanel script will allow you to send formatted messages to the screen.
			
			The MovePiece script is more of a test script that proves out how to move any piece to any legal spot on the board
			
			
		
		*/
		//GameState.readyToClear = true;
	}
	
	if (GameState.player2IsMoving) {
		//Calculate Possible Moves
		//GameState.readyToClear = true;
	}
	
	if (GameState.player1Turn) {
		setCameraToPlayer1();
	}
	
	if (GameState.player2Turn) {
		setCameraToPlayer2();
	}
	
	if ((GameState.readyToClear) && (!GameState.waitingOnPlayer)) {
		clearTheDice();
	}
	
	if (GameState.gameEnd) {
		flipIt();
	}
}

function gameStart() {
	//Game Started
	GameState.gameStart = false;
	
	//Show Text "Roll For Numbers"
	(updateText as UpdateTextPanel).SetDiceValue(0,0);
	(updateText as UpdateTextPanel).SetMiddleText("Roll For Drinking Numbers");
	(updateText as UpdateTextPanel).ShowTextPanelShort();
	
	//move main camera to Player 1 position
	setCameraToPlayer1();
	
	//set rollForNumbers and player1Turn to true
	GameState.rollForNumbers = true;
	GameState.player2Turn = false;
	GameState.player1Turn = true;
}

function setCameraToPlayer1() {
	var camera:GameObject = GameObject.Find("Main Camera");
	if (GameState.is4x3) {
		iTween.MoveTo(camera, MasterPositionMap.mainCameraPlayer1Position4x3, 3);
	}else{
		iTween.MoveTo(camera, MasterPositionMap.mainCameraPlayer1Position, 3);
	}
	iTween.RotateTo(camera,MasterPositionMap.mainCameraPlayer1Rotation, 3);	
}

function setCameraToPlayer2() {
	var camera:GameObject = GameObject.Find("Main Camera");
	if (GameState.is4x3) {
		iTween.MoveTo(camera, MasterPositionMap.mainCameraPlayer2Position4x3, 3);
	}else{
		iTween.MoveTo(camera, MasterPositionMap.mainCameraPlayer2Position, 3);
	}
	iTween.RotateTo(camera,MasterPositionMap.mainCameraPlayer2Rotation, 3);
}

function clearTheDice() {
	GameState.waitingOnPlayer = true;
	(updateText as UpdateTextPanel).SetDiceValue(0,0);
	(updateText as UpdateTextPanel).SetMiddleText("Swipe to Clear Dice");
	(updateText as UpdateTextPanel).ShowTextPanelShort();
}

function flipIt() {

	GameState.gameEnd = false;
	
	var board:GameObject;
	
	board = GameObject.Find("BackgammonB");
	
	board.rigidbody.isKinematic = false;
	board.rigidbody.useGravity = true;
	
	(updateText as UpdateTextPanel).SetMiddleText("Game Over Bitches!");
	(updateText as UpdateTextPanel).ShowTextPanelShort();
	
	board.rigidbody.AddForce(Random.Range(0,0),Random.Range(1000,1500),Random.Range(20,40),ForceMode.Impulse);
}