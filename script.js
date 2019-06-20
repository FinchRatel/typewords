window.onload = () => {
  const game = {
    dropSpeed: 1,
    seconds: 0,
    count: 0,
    rtimes: 0,
    wtimes: 0,
    time: null,
    screenWidth: document.body.offsetWidth,
    screenHeight: document.body.offsetHeight,
    wordsArr: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    $(className) {
      return document.querySelector(className);
    },
    playRightAudio() {
      this.$(".right").load();
      this.$(".right").play();
      this.rtimes++;
    },
    playWrongAudio() {
      this.$(".wrong").load();
      this.$(".wrong").play();
      this.wtimes++;
    },
    setBgMusicVolume() {
      // this.$(".bgmusic").play();
      this.$(".bgmusic").volume = 0.6;
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
          // console.log(String.fromCodePoint(e.keyCode));
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
        this.$(".container").appendChild(temButton);
      }, 1000);
    },
    update() {
      setInterval(() => {
        this.domArr = document.getElementsByTagName('button');
        for (let i = 0; i < this.domArr.length; i++) {
          let ele = this.domArr[i];
          let width = ele.offsetWidth;
          let height = ele.offsetHeight;
          let top = parseInt(ele.style.top);
          let left = parseInt(ele.style.left);
          let min = parseInt(this.screenWidth * 0.1);
          let max = parseInt(this.screenWidth * 0.9 - width);
          let direction = ele.dataset.direction;
          let random = Math.random();
          if (!direction) {
            let randNum = parseInt(random * this.screenWidth * 0.8 + this.screenWidth * 0.1);
            ele.style.top = '-50px';
            ele.style.left = randNum + 'px';
            direction = Math.random() > 0.5 ? 'right' : 'left';
            ele.dataset.direction = direction;
          } else {
            if (top >= this.screenHeight - height - 1) {
              this.$(".container").removeChild(ele);
            } else {
              ele.style.top = top + this.dropSpeed + "px";
              if (direction === 'left') {
                ele.style.left = left - this.dropSpeed * 2 + "px";
              } else {
                ele.style.left = left + this.dropSpeed * 2 + "px";
              }
              if (left <= min) {
                ele.dataset.direction = 'right';
              }
              if (left >= max) {
                ele.dataset.direction = 'left';
              }
            }
          }
        }
      }, 10);
    },
    disappear(i) {
      this.$(".container").removeChild(this.domArr[i]);
    },
    showInfo() {
      setInterval(() => {
        let temNow = new Date();
        this.seconds = (temNow.getTime() - this.time.getTime()) / 1000;
        this.$(".time").innerHTML = (this.seconds).toFixed(3) + "S";
        this.$(".rtimes").innerHTML = this.rtimes;
        this.$(".wtimes").innerHTML = this.wtimes;
        this.$(".alltimes").innerHTML = this.wtimes + this.rtimes;
        this.$(".rpersent").innerHTML = (this.wtimes + this.rtimes) == 0 ? 0 : (this.rtimes / (this.wtimes + this.rtimes)).toFixed(3);
        this.$(".clickpersecond").innerHTML = ((this.wtimes + this.rtimes) / this.seconds).toFixed(3);
        this.$(".clickperminute").innerHTML = (60 * (this.wtimes + this.rtimes) / this.seconds).toFixed(3);
      }, 10);
    },
    resize() {
      window.onresize = () => {
        this.screenWidth = document.body.offsetWidth;
        this.screenHeight = document.body.offsetHeight;
      };
      window.onblur = () => {};
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
};