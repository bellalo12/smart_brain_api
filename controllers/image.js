const Clarifai = require('clarifai');


const app = new Clarifai.App({
 // apiKey: ''
});

const handleApiCall=(req,res)=>{
  app.models
  .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
  .then(data=>{
    res.json(data)
  })
  .catch(err=>res.status(400).json('unable to work with API'))
    }



const handleImage =(req, res, db)=>{
  db.select('*').from('users')
    .where('id', '=', req.body.id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries=>{
      res.json(entries[0])
    })
    .catch(err=>res.status(400).json('fail to count'))
}


module.exports={
  handleImage,
  handleApiCall
}
