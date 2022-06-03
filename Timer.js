export class Timer {
  static get MILLISECONDS_PER_TICK() {
    return 10;
  }

  static get TICKS_PER_SECOND() {
    return 1000 / this.MILLISECONDS_PER_TICK 
  }

  static get NUM_OF_DECIMAL_PLACES() {
    return 2;
  }

  constructor(browser, durationInput, button, timerBorder) {
    this.browser = browser.toLowerCase();
    this.durationInput = durationInput;
    this.button = button;
    this.timerBorder = timerBorder;

    this.circumference = 2 * Math.PI * this.timerBorder.getAttribute("r");
    this.button.addEventListener("click", this.start);
    this.durationInput.addEventListener("blur", this.onDurationChange);

    this.timeBeforeChange = this.timeRemaining;
    this.hasTimerStarted = false;
    this.isPaused = false;
  }

  start = (event) => {
    if (!this.hasTimerStarted && this.timeRemaining != 0) {
      this.toggleButton();
      this.timerBorder.setAttribute("stroke","rgb(111,95,252)");
      this.timerBorder.setAttribute("stroke-dasharray", this.circumference);
      if (this.browser === "safari") {
        this.timerBorder.setAttribute("stroke-dasharray", `${this.circumference} ${this.circumference}`);
      }
      this.timerBorder.setAttribute("stroke-dashoffset", 0);

      this.button.addEventListener("click", this.onPauseClick);
      this.hasTimerStarted = true;
      this.durationInput.disabled = true;

      this.totalTime = this.timeRemaining;
      this.totalTicks = this.totalTime * Timer.TICKS_PER_SECOND;
      this.intervalId = setInterval(this.tick, Timer.MILLISECONDS_PER_TICK);
    }
  };

  tick = () => {
    if (this.timeRemaining <= 0)  {
      this.onPauseClick();
      this.reset();
    }
    else  {
      this.timeRemaining -= Timer.MILLISECONDS_PER_TICK / 1000;
      this.onTick();
    };
  };

  onPauseClick = () => {
    this.toggleButton();

    if (!this.isPaused) 
      this.pause();
    else 
      this.unpause();
  };

  onTick() {
    const oldOffset = this.timerBorder.getAttribute("stroke-dashoffset");
    const currentOffset = oldOffset - this.circumference / this.totalTicks;
    this.timerBorder.setAttribute("stroke-dashoffset", currentOffset);
  }

  onDurationChange = () => {
    const validNumber = new RegExp(/^\d*\.?\d*$/);
    const isNumberValid = validNumber.test(this.timeRemaining);

    if (!isNumberValid) {
      alert("Timer cannot start until you enter a valid number!");
      this.timeRemaining = 0;
      this.reset();
    }
    if (this.timeRemaining != this.timeBeforeChange) 
      this.reset();
  }

  toggleButton() {
    this.button.querySelector("#icon").classList.toggle("fa-play");
    this.button.querySelector("#icon").classList.toggle("fa-pause");
  }

  pause() {
    clearInterval(this.intervalId);
    this.isPaused = true;
    this.durationInput.disabled = false;
  }

  unpause() {
    this.intervalId = setInterval(this.tick, Timer.MILLISECONDS_PER_TICK);
    this.isPaused = false;
    this.durationInput.disabled = true;
  }

  reset() {
    this.timerBorder.setAttribute("stroke", "black");
    this.timerBorder.setAttribute("stroke-dashoffset", 0);
    this.button.removeEventListener("click", this.onPauseClick);

    this.hasTimerStarted = false;
    this.isPaused = false;
  }
  
  get timeRemaining() {
    return this.durationInput.value;
  }

  set timeRemaining(value) {
    this.durationInput.value = value.toFixed(Timer.NUM_OF_DECIMAL_PLACES);
    this.timeBeforeChange = this.timeRemaining;
  }
}
