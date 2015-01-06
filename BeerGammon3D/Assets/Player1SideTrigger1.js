#pragma strict

public var faceValue : int = 0;

var myGameObject : GameObject;

function OnTriggerEnter(other:Collider) {
	var die1ValueGameObject = new GameObject("d1v");
	var die1Value = die1ValueGameObject.AddComponent(DieValue1);
	this.myGameObject = gameObject;
	if ( (this.myGameObject.transform.localPosition.y < 0.865)  || (this.myGameObject.transform.localPosition.y > 0.866) ) {
		(die1Value as DieValue1).currentValue = faceValue;
	}
}
