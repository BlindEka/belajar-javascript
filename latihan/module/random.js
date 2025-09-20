function range(start, stop,step) {
  if (! new.target) return new range(...arguments);
  if (arguments.length > 1) {
    this.start = arguments[0];
    this.stop = arguments[1];
    this.step = arguments[2] || 1;
  } else {
    this.start = 0;
    this.stop = arguments[0];
    this.step = 1;
  };
  this[Symbol.iterator] = () => {
    this.current = this.start;
    return this;
  };
  this.next = () => {
    current = this.current ?? this.start;
    if (current < this.stop) {
      this.current = current + this.step; // prevent undefined this.current by not directly assign it
      return {done: false, value: current};
    } else return {done: true, value: null};
  };
};

function enumerate(iterable, start=0) {
  return Array.from(iterable).map((item, index) => [index + start, item]);
};

function random() {
  return Math.random();
}

random.random = random;

random.randint = function randint(min, max) {
      return Math.round(min - 0.5 + this.random() * (max - min + 1));
};

random.choice = function choice(seq) {
  return seq.length > 0 ? seq[this.randint(0, seq.length - 1)] : null;
};

random.choices = function choices(seq, k=1) {
  return ! seq.length || k <= 0 ? null : Array.from(range(k)).map((v,i,arr) => this.choice(seq));
};
random.randrange = function randrange(...[start, stop, step]) {
  return arguments.length > 1 ? this.choice(Array.from(range(start, stop, step || 1))) : this.choice(Array.from(range(start)));
};
random.uniform = function uniform(min=0, max=1) {
  return min > max ? null : min + this.random() * (max - min);
};

random.randbool = function randbool() {
  return Boolean(Math.round(this.random()));
};

random.sample = function sample(seq, k) {
  if (k > seq.length) return null;
  seq = seq.slice();
  let sample = [];
  for (i of range(k)) {
    sample.push(...seq.splice(this.randint(0, seq.length - 1), 1));
  };
  return sample;
};

random.shuffle = function shuffle(seq) {
  seq.forEach((value, index, array) => {
    let randomNumber = this.randint(0, seq.length - 1);
    [seq[index], seq[randomNumber]] = [seq[randomNumber], seq[index]];
  });
  return seq;
};
