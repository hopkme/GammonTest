#pragma downcast

import System.Collections.Generic;

var startingPositionsWhite = new Array();
var startingPositionsBrown = new Array();

var BeerGammonGUIStyle : GUIStyle;

var startTimer : float = 0.0;

static public var positionsList = new List.< List.<GamePosition> > ();
 
function Start() {
	setStartingPositions();
    resetPiecePositions();
    print("setupGamePositions");
    setupGamePositions();
    startTimer = 1.0;
    print(GameState.selectedSkin);
    if (GameState.selectedSkin == null) {
    	setSkin(GameState.availableSkins[0]);
    }else{
  		setSkin(GameState.selectedSkin);
  	}
}

function Update() {
	if (startTimer > 0){
		startTimer -= Time.deltaTime;
	}else if (startTimer < 0) {
		startTimer = 0;
		GameState.waitingOnPlayer = false;
    	GameState.gameStart = true;
	}
}

function OnGUI () {
	
}

function setStartingPositions() {  //This position information needs to be extracted out of this class
	var x:float = -11.2354;
	var y:float = 10;
	var z1:float = -5.6;
	var z2:float = 15.47;
	
	for (var count3:int = 0; count3 < 15; count3++) {
		var z3:float = z1+(0.355232 * (count3+1));
		startingPositionsWhite.Push(Vector3(x,y,z3));
	}	
	
	for (var count4:int = 0; count4 < 15; count4++) {
		var z4:float = z2-(0.355232 * (count4+1));
		startingPositionsBrown.Push(Vector3(x,y,z4));
	}	
}

function resetPiecePositions () {
	
	for (var count:int = 0; count < 15; count++) {
		//Select game piece
		var gamePieceBrown:GameObject = GameObject.Find("BrownPiece" + (count+1).ToString());		
		gamePieceBrown.transform.Rotate(88,0,0);
		gamePieceBrown.transform.position = startingPositionsBrown[14-count];		
	}
	
	for (var count2:int = 0; count2 < 15; count2++) {
		//Select game piece
		var gamePieceWhite:GameObject = GameObject.Find("WhitePiece" + (count2+1).ToString());		
		gamePieceWhite.transform.Rotate(92,0,0);
		gamePieceWhite.transform.position = startingPositionsWhite[14-count2];			
	}
}

function setupGamePositions() {	
	
	for (var count:int = 0; count < 27; count++) {
		
		var spotsList = new List.<GamePosition>();
		
		for (var count2:int = 0; count2 < 15; count2++) {
			
			var gpGameObject = new GameObject("gp object");
			var gp = gpGameObject.AddComponent(GamePosition);
			gp.position = count+1;
			gp.spot = count2+1;
			gp.location = MasterPositionMap.locationsList[count].get_Item(count2);
			
			if (count == 25) {
				gp.occupiedBy = "BrownPiece" + (count2+1).ToString();
				gp.rotation = Vector3(90,0,0);
			}else if (count == 26) {
				gp.occupiedBy = "WhitePiece" + (count2+1).ToString();
				gp.rotation = Vector3(90,0,0);
			}else{
				gp.occupiedBy = "";
				gp.rotation = Vector3(0,0,0);
			}
						
			spotsList.Add(gp);		
		}
		
		positionsList.Add(spotsList);						
	}
}

function setSkin(_skin : BoardSkin) {
	
	var x64Die : GameObject = GameObject.Find("64Die");
	x64Die.renderer.material.mainTexture = Resources.Load(_skin.boardSkinTexture);
	
	var Board1 : GameObject = GameObject.Find("Board1");
	Board1.renderer.material.mainTexture = Resources.Load(_skin.boardSkinTexture);
	
	var Board2 : GameObject = GameObject.Find("Board2");
	Board2.renderer.material.mainTexture = Resources.Load(_skin.boardSkinTexture);
	
	for (var count:int = 0; count < 15; count++) {
		var gamePieceBrown:GameObject = GameObject.Find("BrownPiece" + (count+1).ToString());		
		gamePieceBrown.renderer.material.mainTexture = Resources.Load(_skin.boardSkinTexture);
	}
	
	for (var count2:int = 0; count2 < 15; count2++) {
		var gamePieceWhite:GameObject = GameObject.Find("WhitePiece" + (count2+1).ToString());		
		gamePieceWhite.renderer.material.mainTexture = Resources.Load(_skin.boardSkinTexture);	
	}
	
	var Handle1 : GameObject = GameObject.Find("Handle1");
	Handle1.renderer.material.mainTexture = Resources.Load(_skin.boardSkinTexture);
	
	var Handle2 : GameObject = GameObject.Find("Handle2");
	Handle2.renderer.material.mainTexture = Resources.Load(_skin.boardSkinTexture);
	
	var HingeConnector1 : GameObject = GameObject.Find("HingeConnector1");
	HingeConnector1.renderer.material.mainTexture = Resources.Load(_skin.boardSkinTexture);
	
	var HingeConnector2 : GameObject = GameObject.Find("HingeConnector2");
	HingeConnector2.renderer.material.mainTexture = Resources.Load(_skin.boardSkinTexture);
	
	var Latch : GameObject = GameObject.Find("Latch");
	Latch.renderer.material.mainTexture = Resources.Load(_skin.boardSkinTexture);
	
	var Player1Die1 : GameObject = GameObject.Find("Player1Die1");
	Player1Die1.renderer.material.mainTexture = Resources.Load(_skin.boardSkinTexture);
	
	var Player1Die2 : GameObject = GameObject.Find("Player1Die2");
	Player1Die2.renderer.material.mainTexture = Resources.Load(_skin.boardSkinTexture);
	
	var Player2Die1 : GameObject = GameObject.Find("Player2Die1");
	Player2Die1.renderer.material.mainTexture = Resources.Load(_skin.boardSkinTexture);
	
	var Player2Die2 : GameObject = GameObject.Find("Player2Die2");
	Player2Die2.renderer.material.mainTexture = Resources.Load(_skin.boardSkinTexture);
	
	var DiceWall1 : GameObject = GameObject.Find("DiceWall1");
	DiceWall1.renderer.material.mainTexture = Resources.Load(_skin.diceWallSkinTexture);
	DiceWall1.renderer.material.color.r = parseFloat(_skin.diceWallColorRed);
	DiceWall1.renderer.material.color.g = parseFloat(_skin.diceWallColorGreen);
	DiceWall1.renderer.material.color.b = parseFloat(_skin.diceWallColorBlue);
	
	var DiceWall2 : GameObject = GameObject.Find("DiceWall2");
	DiceWall2.renderer.material.mainTexture = Resources.Load(_skin.diceWallSkinTexture);
	DiceWall2.renderer.material.color.r = parseFloat(_skin.diceWallColorRed);
	DiceWall2.renderer.material.color.g = parseFloat(_skin.diceWallColorGreen);
	DiceWall2.renderer.material.color.b = parseFloat(_skin.diceWallColorBlue);
	
	
}