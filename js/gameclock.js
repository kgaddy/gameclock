var Clock = function(config) {
		var clock = this;
		var time = config.time,
			remainingTime = time,
			countDown=true,
			qClock, minutes = 0,
			resetAfterTimeout = true,
			stopAferTimeout = true,
			seconds = 0,
			timeoutCallBack, 
			on = false,
			resume = true;
		assignUserSettings();
		displayClock();

		this.SetTime = function(newTime) {
			remainingTime = newTime;
			time = newTime;
			displayClock();
		}

		function assignUserSettings() {
			if (config.resetAfterTimeout != null) {
				resetAfterTimeout = config.resetAfterTimeout;
			}
			if (config.stopAferTimeout != null) {
				stopAferTimeout = config.stopAferTimeout;
			}
			if (config.timeoutCallBack != null) {
				timeoutCallBack = config.timeoutCallBack;
			}
			if(config.time===0){
				countDown=false;
				topAferTimeout = false;
			}
		}

		function calculateTime() {
			if (resume === true) {
				if(countDown===true){
					if (remainingTime <= 0) {
						if (resetAfterTimeout === true) {
							clock.ResetClock();
							resume = true;
						}
						if (stopAferTimeout === true) {
							clock.StopClock();
							resume = false;
						}

						if (timeoutCallBack != null) {
							timeoutCallBack();
						}
					}
				}

				if (resume === true) {
					if(countDown===true){
						remainingTime = remainingTime - 1000;
					}
					else{
						remainingTime = remainingTime + 1000;
					}					
					displayClock();
				}
			}
		}
		//The actual calculation that converts the milliseconds to a mm:ss  and assigns to DOM
		function displayClock() {
			minutes = Math.floor(remainingTime / 1000 / 60);
			seconds = Math.floor(remainingTime / 1000) % 60;
			var displaySec = seconds;
			if (seconds < 10) {
				displaySec = '0' + seconds;
			}
			if (config.displayEL != null) {
				document.getElementById(config.displayEL).innerHTML = minutes + ":" + displaySec;
			}

		}
		//Starts the clock
		this.StartClock = function() {
			resume = true;
			if (on === false) {
				qClock = setInterval(function() {
					on = true;
					calculateTime();
				}, 1000);
			}
		}
		//stops the clock
		this.StopClock = function() {
			on = false;
			clearInterval(qClock)
		}
		//resets the clock
		this.ResetClock = function() {
			remainingTime = time;
			qClock, minutes = 0;
			seconds = 0;
			displayClock();
		}
	}

