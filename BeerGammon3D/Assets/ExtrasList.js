#pragma strict

import System.Collections.Generic;

private var rectTexture : Texture2D;
private var rectStyle : GUIStyle;

private var buttonTexture : Texture2D;
private var buttonStyle : GUIStyle;

// The position on of the scrolling viewport
var scrollPosition : Vector2 = Vector2.zero;

function Start() {

}

function OnGUI () {
	if (GameState.showExtrasView) {
		
		scrollPosition = GUI.BeginScrollView(Rect (50, 50, Screen.width-100, Screen.height-100), scrollPosition, Rect (0, 0, Screen.width-200, 300 * GameState.availableSkins.Count ));
		
		GUIDrawRect(Rect (0, 0, Screen.width-100, 300 * GameState.availableSkins.Count), new Color(0,0,0,0.8f));
		
		var offset : float = 0f;
		
		for (var _boardSkin:BoardSkin in GameState.availableSkins) {		
			GUIDrawButton(Rect (0,offset, Screen.width-100, 300), new Color(0.0f,0.0f,0.0f,0.0f), _boardSkin.skinName, _boardSkin);
			offset = offset + 300f;
		}
		
		GUI.EndScrollView();
	}
}

function Update(){
    if(Input.touchCount > 0)
    {
        var touch = Input.touches[0];
        if (touch.phase == TouchPhase.Moved)
        {
            if (touch.deltaPosition.y < 0) {
            	scrollPosition.y += touch.deltaPosition.y - 20;
            }else{
            	scrollPosition.y += touch.deltaPosition.y + 20;
            }
        }
    }
}
	
function GUIDrawRect( position:Rect, color:Color) {
    if( rectTexture == null ){
        rectTexture = new Texture2D( 1, 1 );
    } 
    if( rectStyle == null ){
        rectStyle = new GUIStyle();
    } 
    rectTexture.SetPixel( 0, 0, color );
    rectTexture.Apply(); 
    rectStyle.normal.background = rectTexture;
    GUI.Box(position, GUIContent.none, rectStyle);
    
}

function GUIDrawButton( position:Rect, color:Color, buttonText:String, theBoardSkin:BoardSkin) {
	if (buttonTexture == null) {
		buttonTexture = new Texture2D(1,1);
	}
	if( buttonStyle == null ){
        buttonStyle = new GUIStyle();
    } 
    buttonTexture.SetPixel(0,0,color);
    buttonTexture.Apply();
    buttonStyle.normal.background = buttonTexture;
    buttonStyle.fontSize = 40;
    
    //Pull in background pic, board pic, description, price/availability
    
    if (GUI.Button(position, buttonText, buttonStyle)) {
    	GameState.selectedSkin = theBoardSkin;
		GameState.showExtrasView = false;
    }
}