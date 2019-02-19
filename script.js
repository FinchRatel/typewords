window.onload = () => {
	const game = {
		dropSpeed: 1,
		seconds: 0,
		count: 0,
		rtimes: 0,
		wtimes: 0,
		time: null,
		screenWidth: parseInt(document.body.clientWidth),
		screenHeight: parseInt(document.body.clientHeight),
		wordsArr: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
		$(className) {
			return document.querySelector('.' + className);
		},
		playRightAudio() {
			this.$("right").load();
			this.$("right").play();
			this.rtimes++;
		},
		playWrongAudio() {
			this.$("wrong").load();
			this.$("wrong").play();
			this.wtimes++;
		},
		setBgMusicVolume() {
			// this.$("bgmusic").play();
			this.$("bgmusic").volume = 0.6;
		},
		checkWord(word) {
			word = word.toUpperCase();
			for (let i = 0; i < this.domArr.length; i++) {
				if (this.domArr[i].innerHTML == word) {
					this.disappear(i);
					this.playRightAudio();
					return;
				}
			}
			this.playWrongAudio();
		},
		keyDown() {
			document.onkeydown = (event) => {
				let e = event || window.event || arguments.callee.caller.arguments[0];
				if (e && e.keyCode) {
					console.log(e.keyCode);
					console.log(String.fromCodePoint(e.keyCode));
					if ((e && e.keyCode == 27) || (e && e.keyCode == 13)) {
						alert("暂停")
					} else {
						this.checkWord(String.fromCodePoint(e.keyCode))
					} 
				}
			};
		},
		add() {
			setInterval(() => {
				let temWord = this.wordsArr[Math.floor(Math.random() * 26)];
				let temButton = document.createElement("button");
				temButton.innerHTML = temWord;
				this.$("container").appendChild(temButton);
			}, 1000);
		},
		update() {
			setInterval(() => {
				this.domArr = document.getElementsByTagName('button');				
				for (let i = 0; i < this.domArr.length; i++) {
					if (!this.domArr[i].style.top) {
						let randNum = parseInt(Math.random() * this.screenWidth * 0.6 + this.screenWidth * 0.2);
						this.domArr[i].style.top = "-50px";
						this.domArr[i].style.left = randNum + "px";
					} else {
						if (parseInt(this.domArr[i].style.top) > this.screenHeight - 50) {
							this.$("container").removeChild(this.domArr[i]);
						} else {
							this.domArr[i].style.top = parseInt(this.domArr[i].style.top) + this.dropSpeed + "px";
						}
					}
				}
			}, 10)
		},
		disappear(i) {
			this.$("container").removeChild(this.domArr[i]);
		},
		showInfo() {
			setInterval(() => {
				let temNow = new Date();
				this.seconds = (temNow.getTime() - this.time.getTime()) / 1000;
				this.$("time").innerHTML = (this.seconds).toFixed(3) + "S";
				this.$("rtimes").innerHTML = this.rtimes;
				this.$("wtimes").innerHTML = this.wtimes;
				this.$("alltimes").innerHTML = this.wtimes + this.rtimes;
				this.$("rpersent").innerHTML = (this.wtimes + this.rtimes) == 0 ? 0 : (this.rtimes / (this.wtimes + this.rtimes)).toFixed(3);
				this.$("clickpersecond").innerHTML = ((this.wtimes + this.rtimes) / this.seconds).toFixed(3);
				this.$("clickperminute").innerHTML = (60 * (this.wtimes + this.rtimes) / this.seconds).toFixed(3);
			}, 10);
		},
		resize() {
			window.onresize = () => {
				this.screenWidth = parseInt(document.body.clientWidth);
				this.screenHeight = parseInt(document.body.clientHeight);
			};
			window.onblur = () => {
			};
		},
		start() {
			this.resize();
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