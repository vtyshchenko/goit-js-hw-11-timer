class CountdownTimer {
  constructor(targetDate) {
    this.targetDate = targetDate;
  }

  start() {
    setInterval(this.countDown.bind(this), 1000);
  }

  countDown() {
    const MSEC = 1000 * 60;
    const HOUR = MSEC * 60;
    const DAY = HOUR * 24;

    const deltaTime = this.targetDate - Date.now();
    const days = this.padInt(Math.floor(deltaTime / DAY));
    const hours = this.padInt(Math.floor((deltaTime % DAY) / HOUR));
    const mins = this.padInt(Math.floor((deltaTime % HOUR) / MSEC));
    const secs = this.padInt(Math.floor((deltaTime % MSEC) / 1000));

    return { days, hours, mins, secs };
  }

  padInt(value) {
    return String(value).padStart(2, "0");
  }
}

class CountdownTimerData extends CountdownTimer {
  constructor({ targetDate, timerSel }) {
    super(targetDate);
    this.timerRef = document.querySelector(timerSel);
    this.daysRef = this.timerRef.querySelector('[data-value="days"');
    this.hoursRef = this.timerRef.querySelector('[data-value="hours"');
    this.minsRef = this.timerRef.querySelector('[data-value="mins"');
    this.secsRef = this.timerRef.querySelector('[data-value="secs"');
    this.setStyle();
    this.countDown();
  }

  setStyle() {
    this.timerRef.style.display = "flex";
    this.timerRef.style.flexWrap = "wrap";
    this.timerRef.style.justifyContent = "space-evenly";
    this.timerRef.style.fontSize = "30px";
  }

  countDown() {
    const { days, hours, mins, secs } = super.countDown();
    this.daysRef.textContent = days;
    this.hoursRef.textContent = hours;
    this.minsRef.textContent = mins;
    this.secsRef.textContent = secs;
  }
}

const timer = new CountdownTimerData({
  targetDate: new Date("Dec 20, 2021").getTime(),
  timerSel: "#timer-1",
});
timer.start();
