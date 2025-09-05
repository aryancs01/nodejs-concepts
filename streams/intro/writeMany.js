//This code will take much longer time to write something million times
// CPU usuage: 100% (one core)
// Promise code

// const fs = require("node:fs/promises");

// (async()=>{
//     console.time("writeMany");
//     let existingFileHandler = await fs.open("text.txt","a");
//     for(let i=0;i<1000000;i++){
//         existingFileHandler.write("AA")
//     }
//     console.timeEnd("writeMany")
// })()

//--------------------------------------------

// Callback fn
// As docs says, it is more useful for expensive operation
// Execution are not in order
// Memory ususge is high 
// const fs = require("node:fs");
// (async () => {
//   console.time("writeMany");
//   fs.open("text.txt", "w", (err, fd) => {
//     for(let i=0;i<1000000;i++){
//         fs.writeSync(fd,"AA")
//     }
//   });
//   console.timeEnd("writeMany");
// })();
// And Actually, it is very fast



//------------------------------------------------
// Using Streams
// Its way way faster!
// Memory usuage is still very high
const fs = require("node:fs/promises");
(async () => {
  console.time("writeMany")
  const fileHandle = await fs.open("test.txt","w");

  const stream = fileHandle.createWriteStream()

  for(let i=0;i<1000000;i++){
    const buff = Buffer.from(` ${i} `,"utf-8")
    stream.write(buff)
  }

  console.timeEnd("writeMany")
})();
