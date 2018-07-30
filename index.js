
const express = require ('express');

const nunjucks = require ('nunjucks');

const moment = require('moment');

const path = require ('path'); // ajuda a trabalhar com os caminhos

const bodyParser = require('body-parser');

const app = express();

// configuracao
nunjucks.configure('views',{
	autoescape:true,
	express:app,
});

// configuracao outra qual a extensao do arquivos para o nunjucks entender os htmls
app.set('view engine','njk');

// mostrando qual sera a pasta das views
app.set('views',path.join(__dirname,'views'));

// converter o corpo de deum requisição para o json
app.use(bodyParser.urlencoded({extended:false}));

app.get('/',(req,res) => {
	res.render('index');
});

app.get('/major',(req,res) => {
  res.render('major');
});

app.get('/minor',(req,res) => {
  res.render('minor');
});



// rota maior
app.get('/major/:nome',(req,res) => {
  const nome = req.params.nome;
  res.render('major');

});

// rota minor
app.get('/minor/:nome',(req,res) => {
  const nome = req.params.nome;
  res.render('minor');

});

app.post('/check',(req,res) => {
  const data_nascimento = req.body.DATA_NASCIMENTO;
  const idade = moment().diff(moment(data_nascimento, "YYYY/MM/DD"), "years");
  if(idade >= 18){
    res.redirect('/major');
  } res.redirect('/minor');


})


app.listen(3000);



