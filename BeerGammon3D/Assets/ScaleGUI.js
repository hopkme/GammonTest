#pragma strict

function Awake() {
	var beerGammonText : GameObject = GameObject.Find("BeerGammonText");
	var playButton : GameObject = GameObject.Find("PlayButton");
	var settingsButton : GameObject = GameObject.Find("SettingsButton");
	var extrasButton : GameObject = GameObject.Find("ExtrasButton");
	
	var a:float = 1.49;
	var c:float = 1.78;
	var b:float = ((Screen.width+0.0)/(Screen.height+0.0));	
	
	if ((b > a) && (b > c)) {
		beerGammonText.transform.localScale.x -= (((b-a)/.5)*.2)/1.4;
		playButton.transform.localScale.x -= (((b-a)/.5)*.2)/1.6;
		settingsButton.transform.localScale.x -= (((b-a)/.5)*.2)/4;
		extrasButton.transform.localScale.x -= (((b-a)/.5)*.2)/4;
	}else if (b < a){
		beerGammonText.transform.localScale.y -= .05;
		playButton.transform.localScale.y -= .05;
		settingsButton.transform.localScale.y -= .03;
		extrasButton.transform.localScale.y -= .03;
		GameState.is4x3 = true;
	}
}