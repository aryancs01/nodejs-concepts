const EventEmitter = require('./myEvents');

class Emitter extends EventEmitter {}

const myEmitter = new Emitter();

// Pushed to an object, "foo" function three times in a object
myEmitter.on("foo",()=>{
    console.log("Event Occured 1")
})

myEmitter.on("foo",()=>{
    console.log("Event Occured 2")
})

myEmitter.on("foo",(x)=>{
    console.log("Event Occured ",x)
})

// even if it called multiple times, it will be invoked only first time and after that it will removed
myEmitter.once("bar",()=>{
    console.log("bar function occured!!")
})

myEmitter.emit("bar")
// myEmitter.emit("bar")
// myEmitter.emit("bar")
myEmitter.emit("foo","some text")