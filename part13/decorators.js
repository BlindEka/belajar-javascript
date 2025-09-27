// koleksi decorator

function debounce(f, ms) {
  let timerId;
  return function(...args) {
    clearTimeout(timerId);
    timerId = setTimeout(f.bind(this, ...args), ms);
    return f.apply(this, args);
  };
}

function throttle(f, ms) {
  let timerId,
  lastCall = 0;
  return function wrapper(...args) {
    if (Date.now() >= lastCall + ms) {
      lastCall = Date.now();
      return f.apply(this, args);
    }
    clearTimeout(timerId);
    return timerId = setTimeout(wrapper.bind(this, ...args), lastCall + ms - Date.now());
  };
}

function combo(f, ms, divideBy=1, callbackFunc) {
  let timerId,
  comboCount = 0,
  endTime = ms;
  return function(...args) {
    comboCount ++;
    endTime /= divideBy;
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      comboCount = 0;
      endTime = ms;
      callbackFunc.call(this, comboCount, args);
    }, endTime);
    return f.apply(this, args);
  };
}


// export agar bisa di import
export {debounce, throttle};