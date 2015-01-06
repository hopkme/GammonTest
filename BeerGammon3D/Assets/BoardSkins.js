#pragma strict

import System.Collections.Generic;
import System.Text;
import System.Xml;
import System.IO;



//static public var availableSkins = new Array();

function Start() {
	loadBoardSkins();
}

function loadBoardSkins() {
	
	var xmlDoc : XmlDocument = new XmlDocument();
	
	var textAsset : TextAsset = Resources.Load("BoardSkinsMaster",TextAsset);	
	xmlDoc.LoadXml(textAsset.text);
	
	if (xmlDoc.ChildNodes.Count > 0) {
		var skinList : XmlNodeList = xmlDoc.GetElementsByTagName("skin");
		
		for (var skinItem : XmlNode in skinList) {
			var skinElementsList : XmlNodeList = skinItem.ChildNodes;
			var _boardSkin : BoardSkin = new BoardSkin();
			GameState.availableSkins.Add(_boardSkin);			
			
			for (var skinElement : XmlNode in skinElementsList) {
				if (skinElement.Name == "skinName") {
					_boardSkin.skinName = skinElement.InnerText;
				}
				else if(skinElement.Name == "boardSkinTexture") {					
					_boardSkin.boardSkinTexture = skinElement.InnerText;
				}
				else if(skinElement.Name == "diceWallSkinTexture") {
					_boardSkin.diceWallSkinTexture = skinElement.InnerText;
				}
				else if(skinElement.Name == "diceWallColorRed") {
					_boardSkin.diceWallColorRed = skinElement.InnerText;
				}
				else if(skinElement.Name == "diceWallColorGreen") {
					_boardSkin.diceWallColorGreen = skinElement.InnerText;
				}
				else if(skinElement.Name == "diceWallColorBlue") {
					_boardSkin.diceWallColorBlue = skinElement.InnerText;
				}
				else if(skinElement.Name == "skinPreview") {
					_boardSkin.skinPreview = skinElement.InnerText;
				}
			}
		}
	}	
} 
