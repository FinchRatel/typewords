window.onload = function() {
	var game = {
		dropSpeed: 1,
		seconds: 0,
		count: 0,
		rtimes: 0,
		wtimes: 0,
		screenWidth: parseInt(document.body.clientWidth),
		screenHeight: parseInt(window.screen.availHeight),
		wordsArr: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"],
		$: function(className) {
			return document.getElementsByClassName(className)[0];
		},
		playRightAudio: function() {
			this.$("right").load();
			this.$("right").play();
			this.rtimes++;
		},
		playWrongAudio: function() {
			this.$("wrong").load();
			this.$("wrong").play();
			this.wtimes++;
		},
		setBgMusicVolume: function() {
			// this.$("bgmusic").play();
			this.$("bgmusic").volume = 0.6;
		},
		checkWord: function(word) {
			var self = this;
			word = word.toUpperCase();
			for (var i = 0; i < self.domArr.length; i++) {
				if (self.domArr[i].innerHTML == word) {
					self.disappear(i);
					self.playRightAudio();
					return;
				}
			}
			this.playWrongAudio();
		},
		keyDown: function() {
			var self = this;
			document.onkeydown = function(event) {
				var e = event || window.event || arguments.callee.caller.arguments[0];
				if (e&& e.keyCode) {
					console.log(e.keyCode);
					console.log(String.fromCharCode(e.keyCode));
					if ((e && e.keyCode == 27)||(e && e.keyCode == 13)) {
						alert("暂停")
					} else {
						self.checkWord(String.fromCharCode(e.keyCode))
					} 
				}
			};
		},
		add: function() {
			var self = this;
			setInterval(function() {
				var temWord = self.wordsArr[Math.floor(Math.random() * 26)];
				var temButton = document.createElement("button");
				temButton.innerHTML = temWord;
				self.$("container").appendChild(temButton);
			}, 1000);
		},
		update: function() {
			var self = this;
			setInterval(function() {
				self.domArr = document.getElementsByTagName('button');				
				for (var i = 0; i < self.domArr.length; i++) {
					if (!self.domArr[i].style.top) {
						var randNum = parseInt(Math.random() * self.screenWidth * 0.6 + self.screenWidth * 0.2);
						self.domArr[i].style.top = "-50px";
						self.domArr[i].style.left = randNum + "px";
					} else {
						if (parseInt(self.domArr[i].style.top) > self.screenHeight * 0.8) {
							self.$("container").removeChild(self.domArr[i]);
						}
						self.domArr[i].style.top = parseInt(self.domArr[i].style.top) + self.dropSpeed + "px";
					}
				}
			}, 10)
		},
		disappear: function(i) {
			// var self = this;
			// domArr[i].style.animation = "myfirst 1s";
			this.$("container").removeChild(this.domArr[i]);
			// domArr[i].className = "destroy";

			// self.container.removeChild(domArr[i]);
		},
		showInfo: function() {
			var self = this;
			setInterval(function() {
				var temNow = new Date();
				self.seconds = (temNow.getTime() - self.time.getTime()) / 1000;
				self.$("time").innerHTML = (self.seconds).toFixed(3) + "S";
				self.$("rtimes").innerHTML = self.rtimes;
				self.$("wtimes").innerHTML = self.wtimes;
				self.$("alltimes").innerHTML = self.wtimes + self.rtimes;
				self.$("rpersent").innerHTML = (self.wtimes + self.rtimes) == 0 ? 0 : (self.rtimes / (self.wtimes + self.rtimes)).toFixed(3);
				self.$("clickpersecond").innerHTML = ((self.wtimes + self.rtimes) / self.seconds).toFixed(3);
				self.$("clickperminute").innerHTML = (60 * (self.wtimes + self.rtimes) / self.seconds).toFixed(3);
			}, 10);
		},
		start: function() {
			this.time = new Date();
			this.setBgMusicVolume();
			this.showInfo();
			this.add();
			this.update();
			this.showInfo();
			this.keyDown();
		}
	}
	game.start();
}