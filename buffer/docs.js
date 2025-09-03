const { Buffer } = require("buffer")

const buff1 = Buffer.from([257, 257.5, -255, '1']);
console.log(buff1.toString("hex"))


console.log(buff1 instanceof Uint8Array)

// Creating TypedArrays from Buffers
// Pass Buffer directly into TypedArray constructor
const buf = Buffer.from([1, 2, 3, 4]);
const uint32array = new Uint32Array(buf);

console.log(uint32array);