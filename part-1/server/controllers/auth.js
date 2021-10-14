const bcrypt = require('bcryptjs')
const users = []

module.exports = {
    login: (req, res) => {
      console.log('Logging In User')
      console.log(req.body)
      const { username, password } = req.body
      for (let i = 0; i < users.length; i++) {
        if (users[i].username === username){
          let existing = bcrypt.compareSync(password, users[i].pinHash)
          if(existing){
            let returnNewUsers = {...users[i]}
            delete returnNewUsers.pinHash
            res.status(200).send(returnNewUsers)
            return
          }
        }
      }
      res.status(400).send("User not found.")
    },
    register: (req, res) => {
        // console.log('Registering User')
        // console.log(req.body)
        const {username, email, firstName, lastName, password, password2} = req.body
        let salt = bcrypt.genSaltSync(5)
        let pinHash = bcrypt.hashSync(password, salt)
        

        const newUsers = {
          username,
          email,
          firstName,
          lastName,
          pinHash,
      }

        users.push(newUsers)

        let returnNewUsers= {...newUsers}
        delete returnNewUsers.pinHash

        res.status(200).send(returnNewUsers)
    }
}
