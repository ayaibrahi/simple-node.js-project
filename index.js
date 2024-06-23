const express = require('express')
const mongoose = require('mongoose')
const Article =require("./model/ArticLe")

const app = express()
app.use(express.json())

mongoose.connect("mongodb+srv://aya:123@cluster0.qtox6or.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")

.then(()=>{
  console.log("connected successfully")
}).catch( (err) => {
  console.log("err " +err)
});


//mongodb+srv://aya:<password>@cluster0.qtox6or.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

app.get('/hi/:num1/:num2', (req, res) => {
  console.log(req.params.num1, req.params.num2)
  res.send('<h1>hello </h1>')
})



app.get('/hi2', (req, res) => {
  // console.log(req.query)
  // res.send(`hello ${req.body.name} and ${req.query.agee}`)

  res.json ({
    name: req.body.name,
age: req.query.agee
    
  })


})


app.get('/count', (req, res) => {
  let count = "";
  for(let i=0 ;i<+50 ;i++) {
    count += i + "-";
  }

  res.render("numbers.ejs",{
    name: "ayaa",
  })
  // res.sendFile(__dirname + "/views/numbers.html")
  // res.send(`count is ${count}`)
})


//======================article endpoent========================

app.post('/articles', async (req, res) => {
  const newArticle = new Article({
    title: req.body.title,
    body: req.body.body,
    numOfliks: req.body.numOfliks
  })
  await newArticle.save()
  res.json("the new article has been saved")
})

app.get('/articles', async (req, res) => {
  const articles = await Article.find()
  res.json(articles)
})

app.get('/articles/:prams', async (req, res) => {
  const id = req.params.prams
  const article = await Article.findById(id)
  res.json(article)
})


app.get('/showArticles', async(req, res) => {
  const articles = await Article.find()

  res.render("article.ejs",{
    allArticles: articles
  })
})



app.listen(3000,()=>{
    console.log('hello aya')
})