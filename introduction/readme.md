# Node.js 

## Basic Introduction
Before starting with Node.js, let us first understand some helpful terms.  

### 1. NVM (Node Version Manager)
NVM is used to manage different versions of Node.js on your system.  

If you are on Linux or Mac, open your terminal and type:  
```bash
nvm ls
```
To install a specific version, use nvm install. For example, to get version 18, type:
```bash
nvm install 18
```
You can find the location of the installed Node.js versions by running 
```bash
which node
```
This command will show you the exact path, for example: /home/your-user/.nvm/versions/node/<version>/bin/node.

go to this route and
here you install(or use) different version.

### Managing Multiple Projects
Using a single, global Node.js version is not always ideal. A better approach is to use a specific version for each project. This prevents conflicts and ensures your code runs as expected.
Here’s how to do it:

1. Go to your project's directory. For example, cd my-project.

2. Tell NVM which version to use. If this project needs version 18, run:
```
nvm use 18
```
3. Create a .nvmrc file. This file tells NVM which Node.js version to use for this specific project. It’s a best practice to keep this file in your project's main folder.

```
touch .nvmrc
```
4. Add the version to the file. The easiest way to get the exact version number is to run node -v and then redirect the output into the file. (or manually copy it and paste)
```
node -v > .nvmrc
```
Now, whenever you or another developer goes into this project folder and runs ```nvm use```. , NVM will automatically read the **.nvmrc** file and switch to the correct Node.js version.