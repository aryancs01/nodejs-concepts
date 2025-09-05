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

const fs = require("node:fs");
(async () => {
  console.time("writeMany");
  fs.open("text.txt", "w", (err, fd) => {
    for(let i=0;i<1000000;i++){
        fs.writeSync(fd,"AA")
    }
  });
  console.timeEnd("writeMany");
})();
// And Actually, it is very fast