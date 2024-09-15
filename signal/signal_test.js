const { signal, slot } = require('./signal.js');


let config = signal({
  a: 1,
  b: 2
});

let a;
slot(() => {
  a = config.value.a;
});

slot(() => {
  let dummy = config.value;
  console.log('config changed', config.value);
  console.log('a: ', a);
});


console.log('change property');
config.value.a = 'ziemniak';

console.log('change object');
config.value = { ...config.value, b: 'pomidor' };

console.log('change object');
config.value = { ...config.value, a: 'pomidor' };


console.log(JSON.stringify(config.value));

console.log('object reasignment');
config = 'bulba';




