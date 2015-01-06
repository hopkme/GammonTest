#pragma strict

var hideTimer : float = 0.0;
var hideShortTimer : float = 0.0;

//Set all pixel insets to 0
//Set (.5,.5,0) to center
//Set GUI Texture Scale X=1 for full width
//Set GUI Texture Scale y=.2 for 1 line
//Set GUI Texture Scale y=.4 for 2 line
//Set GUI Text Pixel Offsets to 0
//Set GUI Text Line Spacing = 1 for true center
//Set GUI Text Line Spacing = 2 for 2 top line display

function SetTopText(newText:String) {	
	var topText : GameObject = GameObject.Find("TopText");
	topText.guiText.text = newText;
	topText.guiText.fontSize = Mathf.Round(Screen.width / 29.95);
}

function SetMiddleText(newText:String) {
	var middleText : GameObject = GameObject.Find("MiddleText");
	middleText.guiText.text = newText;
	middleText.guiText.fontSize = Mathf.Round(Screen.width / 29.95);
}

function SetDiceValue(die1:int, die2:int) {

	Debug.Log(die1);

	var die1gui : GameObject = GameObject.Find("Die1GUI");
	var die2gui : GameObject = GameObject.Find("Die2GUI");
	
	if (die1 == 1){
		die1gui.guiTexture.texture = Resources.Load("Die1");
	}else if (die1 == 2){
		die1gui.guiTexture.texture = Resources.Load("Die2");
	}else if (die1 == 3){
		die1gui.guiTexture.texture = Resources.Load("Die3");
	}else if (die1 == 4){
		die1gui.guiTexture.texture = Resources.Load("Die4");
	}else if (die1 == 5){
		die1gui.guiTexture.texture = Resources.Load("Die5");
	}else if (die1 == 6){
		die1gui.guiTexture.texture = Resources.Load("Die6");
	}else{
		die1gui.guiTexture.texture = null;
	}
	
	if (die2 == 1){
		die2gui.guiTexture.texture = Resources.Load("Die1");
	}else if (die2 == 2){
		die2gui.guiTexture.texture = Resources.Load("Die2");
	}else if (die2 == 3){
		die2gui.guiTexture.texture = Resources.Load("Die3");
	}else if (die2 == 4){
		die2gui.guiTexture.texture = Resources.Load("Die4");
	}else if (die2 == 5){
		die2gui.guiTexture.texture = Resources.Load("Die5");
	}else if (die2 == 6){
		die2gui.guiTexture.texture = Resources.Load("Die6");
	}else{
		die2gui.guiTexture.texture = null;
	}
}

function ShowTextPanel() {
	var textPanel : GameObject = GameObject.Find("TextPanel");
	var topText : GameObject = GameObject.Find("TopText");
	var die1gui : GameObject = GameObject.Find("Die1GUI");
	var die2gui : GameObject = GameObject.Find("Die2GUI");
	die1gui.guiTexture.transform.position.x = 1;
	die2gui.guiTexture.transform.position.x = -1;
	textPanel.guiTexture.transform.localPosition.x = 1.5;
	textPanel.guiTexture.transform.localScale.y=.2;
	topText.guiText.transform.localPosition.x = -.5;
	iTween.MoveTo(textPanel,iTween.Hash("x", .5, "easeType", "easeOutQuad", "speed", 3));
	iTween.MoveTo(topText,iTween.Hash("x", .5, "easeType", "easeOutQuad", "speed", 3));
	if (die2gui.guiTexture.texture != null) {
		iTween.MoveTo(die1gui,iTween.Hash("x",0.45,"easeType", "easeOutQuad", "speed", 3));
		iTween.MoveTo(die2gui,iTween.Hash("x",0.51,"easeType", "easeOutQuad", "speed", 3));
	}else{
		iTween.MoveTo(die1gui,iTween.Hash("x",0.48,"easeType", "easeOutQuad", "speed", 3));
	}
	Debug.Log("Start the Timer");
	hideTimer = 3.0;
}

function ShowTextPanelShort() {
	var textPanel : GameObject = GameObject.Find("TextPanel");
	var middleText : GameObject = GameObject.Find("MiddleText");
	textPanel.guiTexture.transform.localPosition.x = 1.5;
	textPanel.guiTexture.transform.localScale.y=.1;
	middleText.guiText.transform.position.x = -.5;
	//middleText.guiText.transform.position.y = 0.3;
	iTween.MoveTo(textPanel,iTween.Hash("x", .5, "easeType", "easeOutQuad", "speed", 3));
	iTween.MoveTo(middleText,iTween.Hash("x", .5, "easeType", "easeOutQuad", "speed", 3));
	Debug.Log("Start the Timer");
	hideShortTimer = 3.0;
}

function HideTextPanel() {
	var textPanel : GameObject = GameObject.Find("TextPanel");
	var topText : GameObject = GameObject.Find("TopText");
	var die1gui : GameObject = GameObject.Find("Die1GUI");
	var die2gui : GameObject = GameObject.Find("Die2GUI");
	iTween.MoveTo(textPanel,iTween.Hash("x", -.5, "easeType", "easeOutQuad", "speed", 3));
	iTween.MoveTo(topText,iTween.Hash("x", 1.5, "easeType", "easeOutQuad", "speed", 3));
	iTween.MoveTo(die1gui,iTween.Hash("x",1,"easeType", "easeOutQuad", "speed", 3));
	iTween.MoveTo(die2gui,iTween.Hash("x",-1,"easeType", "easeOutQuad", "speed", 3));
}

function HideTextPanelShort() {
	var textPanel : GameObject = GameObject.Find("TextPanel");
	var middleText : GameObject = GameObject.Find("MiddleText");
	iTween.MoveTo(textPanel,iTween.Hash("x", -.5, "easeType", "easeOutQuad", "speed", 3));
	iTween.MoveTo(middleText,iTween.Hash("x", 1.5, "easeType", "easeOutQuad", "speed", 3));
}

function Update() {
	
	var touch : Touch;
	
	if (hideTimer > 0){
		
		/*Detect touch/swipe to hide*/
		
		if ((Input.touchCount == 1) && ( (GameState.player1Turn) || (GameState.player2Turn) )/* && (GameState.readyToClear)*/)
	    {
	        touch = Input.GetTouch(0);
	        /*
	        if (touch.phase == TouchPhase.Moved)
	        {*/
	        	hideTimer = -1;
			/*}*/
		}else{
			hideTimer -= Time.deltaTime;
		}
	}else if (hideTimer < 0) {
		hideTimer = 0;	
		HideTextPanel();
	}
	
	if (hideShortTimer > 0){
		/*Detect touch/swipe to hide*/
		
		if ((Input.touchCount == 1) && ( (GameState.player1Turn) || (GameState.player2Turn) )/* && (GameState.readyToClear)*/)
	    {
	        touch = Input.GetTouch(0);
	        /*
	        if (touch.phase == TouchPhase.Moved)
	        {*/
	        	hideShortTimer = -1;
			/*}*/
		}else{
			hideShortTimer -= Time.deltaTime;
		}
	}else if (hideShortTimer < 0) {
		hideShortTimer = 0;	
		HideTextPanelShort();
	}
}