// export kelas tanpa nama sbg default
export default class Time {
  _hours = 0;
  _minutes = 0;
  _seconds = 0;
  _milliseconds = 0;
  constructor(hours, minutes, seconds, milliseconds) {
    this.hours = hours;
    this.minutes = minutes;
    this.seconds = seconds;
    this.milliseconds = milliseconds;
  }
  static now() {
    let now = new Date();
    return new this(now.getHours(), now.getMinutes(), now.getSeconds(), now.getMilliseconds());
  }
  get hours() {
    return this._hours;
  }
  set hours(value) {
    if (isFinite(value)) this._hours = value;
  }
  get minutes() {
    return this._minutes;
  }
  set minutes(value) {
    if (isFinite(value)) {
      let absValue = Math.abs(value);
      let minutes = absValue % 60;
      let hours = Math.round((absValue - minutes) / 60);
      if (value < 0) {
        this._hours -= (minutes) ? hours + 1 : hours;
        this._minutes = 60 - minutes;
      } else {
              this._hours += hours;
              this._minutes = minutes;
            }
          }
        }
        get seconds() {
          return this._seconds;
  }
  set seconds(value) {
          if (isFinite(value)) {
            let absValue = Math.abs(value);
            let seconds = absValue % 60;
            let minutes = Math.round((absValue - seconds) / 60);
            if (value < 0) {
              this._minutes -= (seconds) ? minutes + 1 : minutes;
              this._seconds = 60 - minutes;
            } else {
              this._minutes += minutes;
              this._seconds = seconds;
            }
          }
  }
  get milliseconds() {
          return this._milliseconds;
  }
  set milliseconds(value) {
          if (isFinite(value)) this._milliseconds = value;
  }
  toString() {
    let {hours, minutes, seconds, milliseconds} = this;
    if (hours < 10) hours = '0' + hours;
    if (minutes < 10) minutes = '0' + minutes;
    if (seconds < 10) seconds = '0' + seconds;
    return `${hours}:${minutes}:${seconds}.${milliseconds}`;
  }
}

export function isSame(time1, time2) {
  return ['hours', 'minutes', 'seconds', 'milliseconds'].every(unit => time1[unit] == time2[unit]);
}
