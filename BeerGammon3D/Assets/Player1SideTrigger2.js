#pragma strict

public var faceValue : int = 0;

var myGameObject : GameObject;

function OnTriggerEnter(other:Collider) {
	var die2ValueGameObject = new GameObject("d2v");
	var die2Value = die2ValueGameObject.AddComponent(DieValue2);
	this.myGameObject = gameObject;
	if ( (this.myGameObject.transform.localPosition.y < 0.865)  || (this.myGameObject.transform.localPosition.y > 0.866) ) {
		(die2Value as DieValue2).currentValue = faceValue;
	}
}
