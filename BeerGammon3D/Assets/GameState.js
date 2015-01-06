#pragma strict

static public var gameStart : boolean = false;
static public var gameEnd : boolean = false;

static public var rollForNumbers : boolean = false;
static public var rollForTurn : boolean = false;

static public var player1Turn : boolean = false;
static public var player2Turn : boolean = false;

static public var player1IsMoving : boolean = false;
static public var player2IsMoving : boolean = false;

static public var initialPlayer1Roll1 : int = 0;
static public var initialPlayer1Roll2 : int = 0;
static public var initialPlayer2Roll1 : int = 0;
static public var initialPlayer2Roll2 : int = 0;

static public var player1Number : int = 0;
static public var player2Number : int = 0;

static public var preRoll : boolean = true;
static public var readyToClear : boolean = false;

static public var waitingOnPlayer : boolean = true; 

static public var currentRollTotal : int = 0;

static public var is4x3 : boolean = false;

static public var showExtrasView : boolean = false;

static public var availableSkins = new List.<BoardSkin>();

static public var selectedSkin : BoardSkin = null;






