#pragma strict

function OnMouseDown() {
	var extrasButton : GameObject = GameObject.Find("ExtrasButton");	
	extrasButton.guiTexture.texture = Resources.Load("ExtrasButtonPressed");
}

function OnMouseUp() {
	var extrasButton : GameObject = GameObject.Find("ExtrasButton");	
	extrasButton.guiTexture.texture = Resources.Load("ExtrasButton");
	showExtrasView();
}

function showExtrasView() {
	GameState.showExtrasView = true;
}