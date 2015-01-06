#pragma strict

public var occupiedBy : String = ""; 	//other legal values include the name of the piece, ie. "BrownPiece4"

public var position : int;  			//legal values will be 1-27, corresponding to the 24 arrows on the board and the pokey, 
										//as well as the 2 starting positions
										
public var spot : int;					//legal values will include 1-15, covering the possible spots per position on the board
							
public var location : Vector3;			//This is the set of coordinates for the piece in this Game Position

public var rotation : Vector3;			//This accounts for the rotation of the piece (on the board in play, vs the starting position