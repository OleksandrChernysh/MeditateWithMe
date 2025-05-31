/*
 * Timer functionality for MeditateWithMe
 */

class Timer {
  constructor() {
    this.initialTime = 300;
    this.timeLeft = this.initialTime;
    this.thankYouElement = document.getElementById("timer-thank-you");
    this.displayElement = document.getElementById("timer-display");
    this.timeElement = document.getElementById("timer-time");
    this.startButton = document.getElementById("timer-start");
    this.audio = document.getElementById("gong-audio");
  }

  init() {
    this.startButton.addEventListener("click", () => {
      this.start();
    });
  }

  start() {
    setTimeout(() => this.toggleThankYou(false), 0);
    setTimeout(() => this.toggleTimeElement(true), 1000);
    setTimeout(() => this.updateTimer(), 1000);
    this.startButton.disabled = true;
    this.audio.play();
  }

  stop() {
    setTimeout(() => this.toggleTimeElement(false), 0);
    setTimeout(() => this.toggleThankYou(true), 1000);
    this.timeLeft = this.initialTime;
    this.startButton.disabled = false;
    this.audio.play();
  }

  updateTimer() {
    const minutes = Math.floor(this.timeLeft / 60);
    const seconds = this.timeLeft % 60;

    this.timeElement.textContent = `${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

    if (this.timeLeft > 0) {
      this.timeLeft--;
      setTimeout(() => this.updateTimer(), 1000);
    } else {
      this.stop();
    }
  }

  toggleThankYou(flag) {
    if (flag === false) {
      this.thankYouElement.classList.remove("fade-in");
      this.thankYouElement.classList.add("fade-out");
    } else {
      this.thankYouElement.classList.remove("fade-out");
      this.thankYouElement.classList.add("fade-in");
    }
  }

  toggleTimeElement(flag) {
    if (flag === false) {
      this.timeElement.classList.remove("fade-in");
      this.timeElement.classList.add("fade-out");
    } else {
      this.timeElement.classList.remove("fade-out");
      this.timeElement.classList.add("fade-in");
    }
  }
}

const timer = new Timer();
timer.init();
