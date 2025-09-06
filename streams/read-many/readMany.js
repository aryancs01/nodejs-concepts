const fs = require("fs/promises");

// Creating Readable Stream
// (async()=>{
//     const fileHandleRead = await fs.open("src.txt","r");
//     const fileHandleWrite = await fs.open("dest.txt","w")

//     const streamRead = fileHandleRead.createReadStream({
//         highWaterMark:64 * 1024
//     });
//     const streamWrite = fileHandleWrite.createWriteStream()

//     streamRead.on("data",(chunk)=>{
//         if(!streamWrite.write(chunk)){
//             streamRead.pause();
//         }
//     })

//     streamWrite.on("drain",()=>{
//         streamRead.resume()
//     })
// })()


// Creating Readable Stream
// Just Writing Sepecific number
// Issue -> sometimes last or first number of an array is not correct, it is incorrect
(async()=>{
    const fileHandleRead = await fs.open("src.txt","r");
    const fileHandleWrite = await fs.open("dest.txt","w")

    const streamRead = fileHandleRead.createReadStream({
        highWaterMark:64 * 1024
    });
    const streamWrite = fileHandleWrite.createWriteStream()

    streamRead.on("data",(chunk)=>{
        chunk.toString("utf-8").trim(" ").split("  ")[1]
        if(!streamWrite.write(chunk)){
            streamRead.pause();
        }
    })

    streamWrite.on("drain",()=>{
        streamRead.resume()
    })
})()