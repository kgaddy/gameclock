var Clock = function(config) {

		var clock = this;
		var time = config.time,
			remainingTime = time,
			qClock,
			minutes = 0,
			resetAfterTimeout = true,
			stopAferTimeout = true,
			seconds = 0,
			start_time_1,
			start_time_2,
			now,
			timeoutCallBack, 
			resume = true;


		assignUserSettings();
		displayClock();


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

		}

		function calculateTime() {
			if (resume === true) {
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
				if (resume === true) {
					now = (new Date()).getTime();
					seconds_elapsed = (now - start_time_2);
					remainingTime = Math.round(start_time_1 / 1000) - Math.round(seconds_elapsed/ 1000);
					remainingTime = remainingTime * 1000;
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
			start_time_2 = (new Date()).getTime();
			start_time_1=remainingTime;
			resume = true;
			qClock = setInterval(function() {
				calculateTime();
			}, 1000);
		}
		//stops the clock
		this.StopClock = function() {
			clearInterval(qClock)
		}
		//resets the clock
		this.ResetClock = function() {
			time = config.time;
			remainingTime = time;
			qClock, minutes = 0;
			seconds = 0;
			displayClock();
		}
	}
