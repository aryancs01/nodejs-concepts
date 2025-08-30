const { Buffer } = require("buffer")

const memoryContainer = Buffer.alloc(4) //4 bytes 32 bits

console.log(memoryContainer) //In Buffer, Hex are stored 

memoryContainer[0] = 0xFF;
memoryContainer.writeInt8(-34, 1)
memoryContainer[2] = 0x34;
memoryContainer[3] = 0xE2;

console.log(memoryContainer) // in Hex
console.log(memoryContainer[0]) // In Decimal
console.log(memoryContainer.readInt8(1)) 
console.log(memoryContainer[2]) 
console.log(memoryContainer[3]) 
//Here min is 0 (00) and max is 255 (FF)


console.log(memoryContainer.toString("hex"))