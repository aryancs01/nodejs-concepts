const fs = require("fs");

// require("fs"); beacuse it has eventEmitter 
(async()=>{
    fs.watch("./text.txt", (eventType, filename) => {
        console.log("\nThe file", filename, "was modified!");
        console.log("The type of change was:", eventType);
    });
})()

// require("fs/promises") This is the promise-based fs API
// It doesn’t even have a watch(path, callback) function
// it gives async iterator

// Classic version: Node’s event loop owns the waiting.
// Promises version: Your for await loop owns the waiting.