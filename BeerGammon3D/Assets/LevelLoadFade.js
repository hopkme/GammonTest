/*
    Usage:
 
    // Load my level    
    LevelLoadFade.FadeAndLoadLevel("mylevel", Color.white, 0.5);
 
    // Reset the current level
    LevelLoadFade.FadeAndLoadLevel(Application.loadedLevel, Color.white, 0.5);
*/

function OnMouseUp () {	
	Application.LoadLevel(Application.loadedLevel + 1);	
}