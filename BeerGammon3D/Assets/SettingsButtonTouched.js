#pragma strict

function OnMouseDown() {
	var settingsButton : GameObject = GameObject.Find("SettingsButton");	
	settingsButton.guiTexture.texture = Resources.Load("SettingsButtonPressed");
}

function OnMouseUp() {
	var settingsButton : GameObject = GameObject.Find("SettingsButton");	
	settingsButton.guiTexture.texture = Resources.Load("SettingsButton");
}