#pragma strict

function Awake () {
	var loadingText : GameObject = GameObject.Find("LoadingText");
	loadingText.guiText.fontSize = Mathf.Round(Screen.width / 29.95);
}

function Update () {
	if(Application.GetStreamProgressForLevel("BackgammonGame") ==1){
    	Application.LoadLevel("BackgammonGame");
    }
}