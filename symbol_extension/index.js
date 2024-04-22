import attachSymbol from "./AttachSymbol.js";

const attachSymbolToObjectPrototype = attachSymbol(Object.prototype);

const PIPE =
  attachSymbolToObjectPrototype(function (fn) { return fn(this); });


({
  firstName: "Dave",
  lastName: "Fincher"
})
[PIPE](o => ({
  fname: o.firstName,
  lname: o.lastName,
  time: new Date(),
}))
[PIPE](o => `[${o.time.toISOString()}] ${o.fname}, ${o.lname}`)
[PIPE](s => s.toUpperCase())
[PIPE](s => console.log(s));