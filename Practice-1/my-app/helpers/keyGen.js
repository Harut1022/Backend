const { v4: uuidv4 } = require('uuid');
const  keyGen = () =>{
  return uuidv4()
}

module.exports = keyGen