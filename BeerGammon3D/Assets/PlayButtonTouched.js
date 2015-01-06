#pragma strict

function OnMouseDown() {
	var playButton : GameObject = GameObject.Find("PlayButton");	
	playButton.guiTexture.texture = Resources.Load("PlayButtonPressed");
}

function OnMouseUp() {
	var playButton : GameObject = GameObject.Find("PlayButton");	
	playButton.guiTexture.texture = Resources.Load("PlayButton");
}