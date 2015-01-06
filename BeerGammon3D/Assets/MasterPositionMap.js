#pragma strict

import System.Collections.Generic;

public var y_level_1 : float = 0.6826097;
public var y_level_2 : float = 1.018576;
public var y_level_3 : float = 1.3545423;

public var pokey_y_level_1 : float = 2.0005;
public var pokey_y_level_2 : float = 2.3364663;
public var pokey_y_level_3 : float = 2.6704326;

static public var mainCameraPlayer1Position : Vector3 = Vector3(-0.1239071,22.15996,-5.206968);
static public var mainCameraPlayer1Position4x3 : Vector3 = Vector3(-0.1239071,26,-6.5);
static public var mainCameraPlayer1Rotation : Vector3 = Vector3(64.1,0,0);
static public var mainCameraPlayer2Position : Vector3 = Vector3(-0.1239071,22.15996,15.38089);
static public var mainCameraPlayer2Position4x3 : Vector3 = Vector3(-0.1239071,26,16.88089);
static public var mainCameraPlayer2Rotation : Vector3 = Vector3(64.1,-180,0);

static public var player1Die1CameraPosition : Vector3 = Vector3(0,0,0);
static public var player1Die2CameraPosition : Vector3 = Vector3(0,0,0);
static public var player2Die1CameraPosition : Vector3 = Vector3(0,0,0);
static public var player2Die2CameraPosition : Vector3 = Vector3(0,0,0);

static public var player1Die1RestPosition : Vector3 = Vector3(-11.51456,1.2,2.720311);
static public var player1Die2RestPosition : Vector3 = Vector3(-10.87963,1.2,1.797905);
static public var player1Die1RestRotation : Vector3 = Vector3(270,180,0);
static public var player1Die2RestRotation : Vector3 = Vector3(0,270,90);

static public var player2Die1RestPosition : Vector3 = Vector3(-11.60725,1.2,-1.674478);
static public var player2Die2RestPosition : Vector3 = Vector3(-10.78973,1.2,-2.489546);
static public var player2Die1RestRotation : Vector3 = Vector3(90,180,0);
static public var player2Die2RestRotation : Vector3 = Vector3(0,0,0);

static public var player1Die1RollPosition : Vector3 = Vector3(9.578082,3.848191,0.353672);
static public var player1Die2RollPosition : Vector3 = Vector3(10.34094,3.701299,-0.8505635);
static public var player1Die1RollRotation : Vector3 = Vector3(270,180,0);
static public var player1Die2RollRotation : Vector3 = Vector3(0,280,90);

static public var player2Die1RollPosition : Vector3 = Vector3(-11.05052,3.8,0.9244146);
static public var player2Die2RollPosition : Vector3 = Vector3(-10.78973,4.161971,-0.3326964);
static public var player2Die1RollRotation : Vector3 = Vector3(90,180,0);
static public var player2Die2RollRotation : Vector3 = Vector3(0,0,0);

static public var locationsList = new List.< List.<Vector3> > ();

/*


1-12

Z starts at -9.8 for spots 1, 6, and 11
add 1.5 for the next piece in line, and so on.

13-24

Z starts at 9.8 for spots 1, 6, and 11
subtract 1.5 for the next piece in line, and so on.

1-6

X starts at -9.24
add 1.5 for the next piece, and so on

19-24

X starts at -1.74
subtract 1.5 for the next piece, and so on

7-12

X starts at 1.55
add 1.5 for the next piece, and so on

13-18

X starts at 9.05
subtract 1.5 for the next piece, and so on

25

X is .09

Z order is as follows: 0, 1.5, -1.5, 3, -3
repeat for the ascending y levels

26

X is -11.2354
Y is 10


27

X is -11.2354
Y is 10

*/

function Awake() {
	createLocationMapping();
}

function createLocationMapping() {	
	print("createLocationMapping");
	firstSix();
	secondSix();
	thirdSix();
	fourthSix();
	pokey();
	home1();
	home2();
	print(locationsList.Count.ToString());
}

function firstSix() {
	for (var count:int = 0; count < 6; count++) {
		var vectorList = new List.<Vector3> ();
		var x : float;
		var y : float;
		var z : float;
		
		x = -9.24 + (count * 1.5);
		
		for (var count2:int = 0; count2 < 5; count2++) {
			y = y_level_1;
			z = -9.8 + (count2 * 1.5);
			vectorList.Add(Vector3(x,y,z));
		}
		
		for (var count3:int = 0; count3 < 5; count3++) {
			y = y_level_2;
			z = -9.8 + (count3 * 1.5);
			vectorList.Add(Vector3(x,y,z));
		}
		
		for (var count4:int = 0; count4 < 5; count4++) {
			y = y_level_3;
			z = -9.8 + (count4 * 1.5);
			vectorList.Add(Vector3(x,y,z));
		}
		locationsList.Add(vectorList);
	}
}

function secondSix() {
	for (var count:int = 0; count < 6; count++) {
		
		var vectorList = new List.<Vector3>();
		var x : float;
		var y : float;
		var z : float;
		
		x = 1.55 + (count * 1.5);
		
		for (var count2:int = 0; count2 < 5; count2++) {
			y = y_level_1;
			z = -9.8 + (count2 * 1.5);
			vectorList.Add(Vector3(x,y,z));
		}
		
		for (var count3:int = 0; count3 < 5; count3++) {
			y = y_level_2;
			z = -9.8 + (count3 * 1.5);
			vectorList.Add(Vector3(x,y,z));
		}
		
		for (var count4:int = 0; count4 < 5; count4++) {
			y = y_level_3;
			z = -9.8 + (count4 * 1.5);
			vectorList.Add(Vector3(x,y,z));
		}
		locationsList.Add(vectorList);
	}
}

function thirdSix() {
	for (var count:int = 0; count < 6; count++) {
		
		var vectorList = new List.<Vector3>();
		var x : float;
		var y : float;
		var z : float;
		
		x = 9.05 - (count * 1.5);
		
		for (var count2:int = 0; count2 < 5; count2++) {
			y = y_level_1;
			z = 9.8 - (count2 * 1.5);
			vectorList.Add(Vector3(x,y,z));
		}
		
		for (var count3:int = 0; count3 < 5; count3++) {
			y = y_level_2;
			z = 9.8 - (count3 * 1.5);
			vectorList.Add(Vector3(x,y,z));
		}
		
		for (var count4:int = 0; count4 < 5; count4++) {
			y = y_level_3;
			z = 9.8 - (count4 * 1.5);
			vectorList.Add(Vector3(x,y,z));
		}
		locationsList.Add(vectorList);
	}
}

function fourthSix() {
	for (var count:int = 0; count < 6; count++) {
		
		var vectorList = new List.<Vector3>();
		var x : float;
		var y : float;
		var z : float;
		
		x = -1.74 - (count * 1.5);
		
		for (var count2:int = 0; count2 < 5; count2++) {
			y = y_level_1;
			z = 9.8 - (count2 * 1.5);
			vectorList.Add(Vector3(x,y,z));
		}
		
		for (var count3:int = 0; count3 < 5; count3++) {
			y = y_level_2;
			z = 9.8 - (count3 * 1.5);
			vectorList.Add(Vector3(x,y,z));
		}
		
		for (var count4:int = 0; count4 < 5; count4++) {
			y = y_level_3;
			z = 9.8 - (count4 * 1.5);
			vectorList.Add(Vector3(x,y,z));
		}
		locationsList.Add(vectorList);
	}
}

function pokey() {
	var vectorList = new List.<Vector3>();
	var x : float;
	var y : float;
	var z : float; 
	
	x = 0;
	
	for (var count2:int = 0; count2 < 5; count2++) {
		y = pokey_y_level_1;
		switch (count2) {
			case 0:
				z = 0;
				break;
			case 1:
				z = 1.5;
				break;
			case 2:
				z = -1.5;
				break;
			case 3:
				z = 3;
				break;
			case 4:
				z = -3;
				break;
		}		
		vectorList.Add(Vector3(x,y,z));
	}
		
	for (var count3:int = 0; count3 < 5; count3++) {
		y = pokey_y_level_2;
		switch (count3) {
			case 0:
				z = 0;
				break;
			case 1:
				z = 1.5;
				break;
			case 2:
				z = -1.5;
				break;
			case 3:
				z = 3;
				break;
			case 4:
				z = -3;
				break;
		}
		vectorList.Add(Vector3(x,y,z));
	}
		
	for (var count4:int = 0; count4 < 5; count4++) {
		y = pokey_y_level_3;
		switch (count4) {
			case 0:
				z = 0;
				break;
			case 1:
				z = 1.5;
				break;
			case 2:
				z = -1.5;
				break;
			case 3:
				z = 3;
				break;
			case 4:
				z = -3;
				break;
		}
		vectorList.Add(Vector3(x,y,z));
	}
	locationsList.Add(vectorList);
}

function home1() {
	var vectorList = new List.<Vector3>();
	var x:float = -11.2354;
	var y:float = 10;
	var z:float = -5.6;
	
	
	for (var count:int = 0; count < 15; count++) {
		var z2:float = z+(0.355232 * (count+1));
		vectorList.Add(Vector3(x,y,z2));
	}	
	locationsList.Add(vectorList);
}

function home2() {
	var vectorList = new List.<Vector3>();
	var x:float = -11.2354;
	var y:float = 10;
	var z:float = 15.47;
	
	for (var count:int = 0; count < 15; count++) {
		var z2:float = z-(0.355232 * (count+1));
		vectorList.Add(Vector3(x,y,z2));
	}
	locationsList.Add(vectorList);	
}