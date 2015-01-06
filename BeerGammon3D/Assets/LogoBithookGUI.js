var startTime;
var timer2:int; 

function Awake() {
	var bithook : GameObject = GameObject.Find("SplashBithook");
	
	var a:float = 1.49;
	var c:float = 1.78;
	var b:float = ((Screen.width+0.0)/(Screen.height+0.0));
	
	if ((b > a) && (b > c)) {
		bithook.transform.localScale.x = b - ((Screen.height+0.0)/(Screen.width+0.0)) - 1;
	}else if (b < a){
		bithook.transform.localScale.y = ((Screen.height+0.0)/(Screen.width+0.0));
	}
} 
 
function Update(){TimerStart();} 
 
function TimerStart(){
 
	startTime = Time.time; //time starter
 
	timer2 = Time.time;  //Set time
 
	if(timer2 > 4){ //<-------the number here are the seconds you want
 
		Application.LoadLevel(Application.loadedLevel + 1);
 
	}
}