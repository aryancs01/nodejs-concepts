const fs = require("fs/promises");
// open (32) file descriptor -> unique number assigned to open file
// read or write
// by default Nodejs allocates 16KB

(async () => {
  const CREATE_FILE = "create a file";
  async function createFile(path) {
    let existingFileHandle;
    try {
      // check wheather we have file or not
      existingFileHandle = await fs.open(path, "r");
      existingFileHandle.close();
      
      return console.log(`The file ${path} already exists`);
    } catch (err) {
      //we dont have a file, we should create it
      const newFileHandle = await fs.open(path, "w");
      console.log("A new file was successfully created");
      newFileHandle.close();
    }
  }

  const commandFileHandler = await fs.open("./command.txt", "r");
  const watcher = fs.watch("./command.txt");

  commandFileHandler.on("change", async () => {
    //get the size of file
    const { size } = await commandFileHandler.stat();
    //allocate the buffer
    const buff = Buffer.alloc(size);

    //the location at which we want to start filling  our buffer
    const offset = 0;
    // how many bytes we want to read
    const length = buff.byteLength;
    //at what postion which we want to read, because position updates everytime we reed
    const position = 0;

    commandFileHandler.read(buff, offset, length, position);

    const command = buff.toString("utf-8");

    //create a file
    // create a file <path>
    if (command.includes(CREATE_FILE)) {
      const filePath = command.substring(CREATE_FILE.length + 1);
      createFile(filePath);
    }
  });

  //watcher is an async iterator.
  //Each iteration calls await watcher.next().create a file
  //That next() internally waits until the OS tells Node “file changed”.
  //Only then does it resolve and give you an event.
  for await (const event of watcher) {
    if (event.eventType === "change") {
      commandFileHandler.emit("change");
    }
  }
})();
