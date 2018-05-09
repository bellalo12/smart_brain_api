const handleRegister = (req, res, db, bcrypt)=>{
  const hash = bcrypt.hashSync(req.body.password)
  db.transaction(trx=>{
    trx.insert({
      hash:hash,
      email:req.body.email
    })
    .into('login')
    .returning('email')
    .then(loginEmail=>{
      return trx('users')
      .insert({
        name: req.body.name,
        email: loginEmail[0],
        joined: new Date()
      })
      .returning('*')
      .then(user=>{
        res.json(user[0])
      })
    })
    .then(trx.commit)
    .catch(trx.rollback)
  })
  .catch(err=>res.status(400).json('unable to register'))
}


module.exports={
  handleRegister: handleRegister
}
