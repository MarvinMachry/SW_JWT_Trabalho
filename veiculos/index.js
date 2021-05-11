const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const { pool } = require('./config')

const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors())

const getVeiculos = (request, response) => {
    pool.query('SELECT * FROM veiculos', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const addVeiculo = (request, response) => {
    const { nome, ano, cor, placa } = request.body

    pool.query(
        'INSERT INTO veiculos (nome, ano, cor, placa) VALUES ($1, $2, $3, $4)',
        [nome, ano, cor, placa],
        (error) => {
            if (error) {
                s
                throw error
            }
            response.status(201).json({ status: 'success', message: 'Veiculo criado.' })
        },
    )
}

const updateVeiculo = (request, response) => {
    const { codigo, nome, preco, estoque } = request.body
    pool.query('UPDATE veiculos set nome=$1, ano=$2, cor=$3, placa=$4 where codigo=$5',
        [nome, preco, estoque, codigo], error => {
            if (error) {
                console.log(error)
                throw error
            }
            response.status(201).json({ status: 'success', message: 'Veiculo atualizado.' })
        })
}

const deleteVeiculo = (request, response) => {    
    const codigo = parseInt(request.params.id);
    pool.query('DELETE FROM veiculos where codigo = $1', [codigo], error => {
        if (error) {
            console.log(error);
            throw error
        }
        response.status(201).json({ status: 'success', message: 'Veiculo apagado.' })
    })
}

const getVeiculoPorID = (request, response) => {
    const codigo = parseInt(request.params.id);
    pool.query('SELECT * FROM veiculos where codigo = $1', [codigo], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

app
    .route('/veiculos')
    // GET endpoint
    .get(getVeiculos)
    // POST endpoint
    .post(addVeiculo)
    // PUT
    .put(updateVeiculo)  

app.route('/veiculos/:id')
    .get(getVeiculoPorID) 
    .delete(deleteVeiculo) 


// Start server
app.listen(process.env.PORT || 3002, () => {
    console.log(`Servidor rodando na porta 3002`)
})