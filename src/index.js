const express = require("express") /*Declarando que vou fazer uma requisição para a biblioteca express*/
const mongoose = require('mongoose')
const app = express() /*Declarando que vou utilizar na minha aplicação o express*/
app.use(express.json())
const port = 3000 /*Declarando a porta que vai ser executada*/

const Film = mongoose.model('Film', { 
  title: String,
  description: String,
  image_url: String,
  trailer_url: String 
});

app.get('/', async (req, res) => {
  const films = await Film.find()
  return res.send(films)/*Requerindo (res) a rota "/" e receber a resposta (res), get significa "Listar"*/ 
  })

app.delete("/:id", async(req, res) => {
  const film = await Film.findByIdAndDelete(req.params.id)
  return res.send(film)
})

app.put("/:id", async(req, res) => {
  const film = await Film.findByIdAndUpdate(req.params.id, {
    title: req.body.title,
    description: req.body.description,
    image_url: req.body.image_url,
    trailer_url: req.body.trailer_url
}, {
  new: true
})

  return res.send (film)
})

app.post("/", async (req, res) => {
  const film = new Film({
    title: req.body.title,
    description: req.body.description,
    image_url: req.body.image_url,
    trailer_url: req.body.trailer_url
  })

  await film.save()
  return res.send(film)
})

app.listen(port, () => { /*Aplicação vai estar escutando nossa porta*/ 
  mongoose.connect('mongodb+srv://kaiqueln03:zSePAB3AYcIqmUP5@starwars-api.ei6ml.mongodb.net/?retryWrites=true&w=majority&appName=starwars-api');
    console.log(`Example app listening on port ${port}`) /*Vai emitir somente no console log para ver se está funcional*/ 
  })
  