const { parseEquation, gaussJordanElimination } = require('./scripts/algoritmoSistema');

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

app.get('/multiplicarMatrizXEscalar', (req, res) => {
    res.render('multiplicarMatrizXEscalar')
})

app.post('/multiplicarMatrizXEscalar', (req, res) => {
    const i = parseInt(req.body.i, 10);
    const j = parseInt(req.body.j, 10);

    console.log(`i: ${i}, j: ${j}`)
    if (isNaN(i) || isNaN(j) || i <= 0 || j <= 0 || i > 10 || j > 10) {
        return res.status(400).send('Dimensões inválidas para a matriz. As dimensões devem ser positivas e não podem exceder 10.');
    }

    let matriz = Array(i).fill().map(() => Array(j).fill());

    console.log(matriz)

    res.render('multiplicarMatrizXEscalar', { 
        matriz: matriz, 
    });
})

app.get('/multiplicarMatrizXMatriz', (req, res) => {
    res.render('multiplicarMatrizXMatriz')
})

app.post('/multiplicarMatrizXMatriz', (req, res) => {
    const i1 = parseInt(req.body.i1, 10);
    const j1 = parseInt(req.body.j1, 10);
    const i2 = parseInt(req.body.i2, 10);
    const j2 = parseInt(req.body.j2, 10);

    console.log(`i1: ${i1}, j1: ${j1}`)
    console.log(`i1: ${i2}, j1: ${j2}`)

    if (isNaN(i1, i2) || isNaN(j1, j2) || i1, i2 <= 0 || j1, j2 <= 0 || i1, i2 > 10 || j1, j2 > 10) {
        return res.status(400).send('Dimensões inválidas para as matrizes. As dimensões devem ser positivas e não podem exceder 10.');
    }
    if (i1 != j2) {
        return res.status(401).send('Dimensões inválidas para as matrizes. O número de linhas da primeira matriz deve ser igual ao de colunas da segunda.')
    }

    let matriz1 = Array(i1).fill().map(() => Array(j1).fill());
    let matriz2 = Array(i2).fill().map(() => Array(j2).fill());

    console.log(matriz1)
    console.log(matriz2)

    res.render('multiplicarMatrizXMatriz', { 
        matriz1: matriz1, 
        matriz2: matriz2
    });
});

app.get('/resolverSistemaLinear', (req, res) => {
    res.render('resolverSistemaLinear')
})

app.post('/resolverSistemaLinear', (req, res) => {
    const equations = req.body.equations.split('\n');
    let matrix = equations.map(eq => parseEquation(eq).slice(0, 3));
    let constants = equations.map(eq => parseEquation(eq)[3]);
    let { solution, stages } = gaussJordanElimination(matrix, constants);
    res.render('resolverSistemaLinear', { solution, stages });
});

app.listen(8080, () => {
    console.log("App rodando!");
    console.log("Acesse-o em http://localhost:8080/");
});
