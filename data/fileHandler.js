const consts = require('../consts')

const filesData = []

const addFile = (file, user, isPrivate) => {
  return new Promise((resolve, reject) => {
    let downloadPath = `${user.username}/${file.name}`;
    let localPath = `${consts.BASE_PATH}/${user.username}/${file.name}`;

    // Create the new file object
    let currFile = {
      name: file.name,
      localPath,
      downloadPath,
      owner: user.username,
      size: file.data.length,
      isPrivate: isPrivate ? isPrivate : false
    };

    // Try to move the file to the correct place on the server
    file.mv(localPath).then(() => {
      // If no errors in saving the file, add it to the db
      filesData.push(currFile);
      resolve(currFile)
    }).catch(reject)
  })
};

// Return the file object from the 'db' with the correct owner and downloadpath
const getFileByName = (owner, name) => {
  let currFile = filesData.filter((file) => {
    return file.owner === owner && file.name === name && !file.isPrivate;
  })[0];

  return currFile ? currFile : false;
}

const getFileByToken = (token) => {
  let currFile = filesData.filter((file) => {
    return file.token == token;
  })[0];

  return currFile ? currFile : false;
}

module.exports = {
  addFile,
  getFileByName,
  getFileByToken
}