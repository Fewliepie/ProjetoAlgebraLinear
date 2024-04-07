const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json()); 

app.get("/", (req, res) => {
    res.render("index");
});

app.get('/somarMatrizes', (req, res) => {
    res.render('somarMatrizes');
});

app.post('/somarMatrizes', (req, res) => {
    const i = parseInt(req.body.i, 10);
    const j = parseInt(req.body.j, 10);

    console.log(`i: ${i}, j: ${j}`)
    if (isNaN(i) || isNaN(j) || i <= 0 || j <= 0 || i > 10 || j > 10) {
        return res.status(400).send('Dimensões inválidas para as matrizes. As dimensões devem ser positivas e não podem exceder 10.');
    }

    let matriz1 = Array(i).fill().map(() => Array(j).fill());
    let matriz2 = Array(i).fill().map(() => Array(j).fill());

    console.log(matriz1)
    console.log(matriz2)
    res.render('somarMatrizes', { 
        matriz1: matriz1, 
        matriz2: matriz2
    });
});

app.listen(8080, () => {
    console.log("App rodando!");
    console.log("Acesse-o em http://localhost:8080/");
});
