const fs = require("fs/promises");
// open (32) file descriptor -> unique number assigned to open file
// read or write
// by default Nodejs allocates 16KB

(async () => {
  const CREATE_FILE = "create a file";
  const DELETE_FILE = "delete the file";
  const RENAME_FILE = "rename the file";
  const ADD_TO_FILE = "add to the file";

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

  async function deleteFile(path) {
    console.log(`Deleting a  file ${path}`)
    try {
      await fs.unlink(path);
      
      return console.log(`The file ${path} is deleted`);
    } catch (error) {
      return console.log(`error: ${error}`);
    }
  }

  async function renameFile(oldPath,newPath) {
    try {
      await fs.rename(oldPath,newPath)
      return console.log(`file is renamed from ${oldPath} to ${newPath}`)
    } catch (error) {
      return console.log(`error: ${error}`);
    }
  }

  async function addToFile(path, content) {
    console.log(`Adding to the ${path}`)
    try {
      await fs.writeFile(path,content)
      return console.log(`content: ${content} is written at path:${path}`)
    } catch (error) {
      return console.log(`error: ${error}`);
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

    // delete a file
    // delete the file <path>
    if(command.includes(DELETE_FILE)){
      const filePath = command.substring(DELETE_FILE.length + 1);
      deleteFile(filePath);
    }

    // rename file:
    // `rename the file <path> to <new-path>`
    if(command.includes(RENAME_FILE)){
      const _idx = command.indexOf(" to ")
      const oldFilePath = command.substring(RENAME_FILE.length + 1,_idx)
      const newFilePath = command.substring(_idx + 4);

      renameFile(oldFilePath, newFilePath)
    }

    // add to file 
    // add to the file <path> this content: <content>  
    if(command.includes(ADD_TO_FILE)){
      const _idx = command.indexOf(" this content: ");
      const filePath = command.substring(ADD_TO_FILE.length + 1,_idx);
      const content = command.substring(_idx + 15)

      addToFile(filePath,content)
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
