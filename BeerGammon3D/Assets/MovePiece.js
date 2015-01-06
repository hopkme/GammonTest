#pragma strict

import System.Collections.Generic;

public var finalPlacement:Vector3;

public var name:String = "";
 
function Start () {
    //the value specified is simply a test position
    //finalPlacement = Vector3(-1.726813,0.6826097,-4.896599);
    //test random positioning
    
}

function OnMouseUp() {

	var seed : int = Random.Range(0,25);
    var spot : int = -1;
    //while (spot == -1) {
    	spot = returnOpenSpot(InitializeBoard.positionsList[seed]);
    	if (spot != -1) {
    	   	finalPlacement = (InitializeBoard.positionsList[seed].get_Item(spot) as GamePosition).location;
    	}
    //}
    
	transform.rigidbody.useGravity = false;
	
	var pointA = transform.position;	
	
	var upPosition1 = Vector3(pointA.x,10.0,pointA.z);	
	var upPosition2 = Vector3(finalPlacement.x + GameObject.Find("BackgammonB").transform.localPosition.x,10.0,finalPlacement.z + GameObject.Find("BackgammonB").transform.localPosition.z );
	
	var startRotation = Quaternion.Euler(transform.rotation.x,transform.rotation.y,transform.rotation.z);
	var endRotation = Quaternion.Euler((InitializeBoard.positionsList[seed].get_Item(spot) as GamePosition).rotation);	
	
	yield MoveObject(transform,transform.position,upPosition1,startRotation,startRotation,0.5);
	
	yield MoveObject(transform,transform.position,upPosition2,startRotation,endRotation,0.5);
	
	transform.rigidbody.useGravity = true;
	
	//Update occupied positions
	
	for (var count:int = 0; count < 27; count++) {
		for (var count2:int = 0; count2 < 15; count2++) {
			if ((InitializeBoard.positionsList[count].get_Item(count2) as GamePosition).occupiedBy == gameObject.name) {
				(InitializeBoard.positionsList[count].get_Item(count2) as GamePosition).occupiedBy = "";
			}			
		}
	}
	
	(InitializeBoard.positionsList[seed].get_Item(spot) as GamePosition).occupiedBy = gameObject.name;
	  
}
 
function MoveObject (thisTransform:Transform, startPos:Vector3, endPos:Vector3, startRot:Quaternion, endRot:Quaternion, time:float) {
    var i = 0.0;
    var rate = 1.0/time;
    while (i < 1.0) {
        i += Time.deltaTime * rate;
        thisTransform.position = Vector3.Lerp(startPos, endPos, i);
        if (startRot != endRot) {
        	thisTransform.rotation = Quaternion.Lerp(startRot,endRot, i);
        }
        yield; 
    }
}

function returnOpenSpot(spotList : List.<GamePosition>) : int {
	
	for (var count=0; count<15; count++) {
		var gpGameObject = new GameObject("gp object");
		var gp = gpGameObject.AddComponent(GamePosition);
		gp = spotList.get_Item(count);
		if (gp.occupiedBy == "") {
			return count;			
		} else if (gp.occupiedBy.Substring(0, 5) != gameObject.name.Substring(0, 5) ) {
			break;
		}
	}
	return -1;
}