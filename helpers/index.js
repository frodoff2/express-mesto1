const fs = require('fs');

const getFile = userPath => {
  return new Promise((res, rej) => {
    fs.readFile(userPath, (err, data) => {
      if(err) {
        rej(err)
      }
      res(data)
    })
  })
}

module.exports  = getFile;