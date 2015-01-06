var startTime;
var timer1:int;

function Awake() {
	
	var riders : GameObject = GameObject.Find("IntroRiders");
	
	var a:float = 1.49;
	var c:float = 1.78;
	var b:float = ((Screen.width+0.0)/(Screen.height+0.0));
	
	if ((b > a) && (b > c)) {
		riders.transform.localScale.x = b - ((Screen.height+0.0)/(Screen.width+0.0)) - 1;
	}else if (b < a){
		riders.transform.localScale.y = ((Screen.height+0.0)/(Screen.width+0.0));
	}
} 
 
function Update(){TimerStart();} 
 
function TimerStart(){
 
	startTime = Time.time; //time starter
 
	timer1 = Time.time;  //Set time
 
	if(timer1 > 2){ //<-------the number here are the seconds you want
 
		Application.LoadLevel(Application.loadedLevel + 1);
 
	}
}