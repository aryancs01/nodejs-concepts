const { Buffer } = require("buffer")

//takes some time to fill
// const buffer = Buffer.alloc(10,0 )

// could have some existing data and sensitive data
// doest not make existing buffer elements zero
// Security Issue
// Bit faster then alloc
const unsafeBuffer = Buffer.allocUnsafe(10000)

for(let i=0;i<unsafeBuffer.length;i++){
    if(unsafeBuffer[i] !== 0){
        console.log(`Element at pos ${i} has value ${unsafeBuffer[i].toString(2)}`)
    }
}


//Another reason why allocunsafe is fast
//Node allocate a piece of memory, 8KiB
// console.log(Buffer.poolSize)
// Use this piece to allocate buffer, because it is fastest
// **and only allocUnsafe can only use it (along with from & concat), It should match the size
// size of allocUnsafe should be less then size of node divied by 2 (floor value)
// in Nodejs docs-> BufferPoolSize >>> 1 (divide by2)


//Another one
// Not use already allocated Buffer
// and same as unsafe alloc
const buf = Buffer.allocUnsafeSlow(2)