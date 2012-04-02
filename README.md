# gameclock.js 

## A javascript library creating timer/game clocks for games



gameclock.js is a javascript library that can be used to create a timer/clock for games:


## Documentation


A step by step guide on how to use gameclock.js:

* Use gameclock.js:

```
<script type="text/javascript" src="js/gameclock.js"></script>
```



* Create an instance of the clock:
```
var clock = new Clock({
	time:9000,
	displayEL:'clock',
	stopAferTimeout:true,
	resetAfterTimeout:false,
	timeoutCallBack:stopme
});
Start The clock:
clock.StartClock();
Stop The clock:
clock.StopClock();
Reset The clock:
clock.ResetClock();
```



## Configuration:
 * displayEL: The display element. This will display the current state of the clock in a element.
 * time: The amount of time for the game.
 * stopAferTimeout: If true, will stop at zero. If false, will contine to display a negative time.
 * resetAfterTimeout: If true, will reset the clock to the "time" value and continue to countdown.
 * timeoutCallBack: A callback function that will fire when the clock reaches zero.
