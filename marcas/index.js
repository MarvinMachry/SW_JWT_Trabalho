const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const { pool } = require('./config')

const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors())

const getMarca = (request, response, next) => {
    pool.query('SELECT * FROM marcas', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const addMarca = (request, response, next) => {
    const { nome, cnpj } = request.body

    pool.query(
        'INSERT INTO marcas (nome, cnpj) VALUES ($1, $2)',
        [nome, cnpj],
        (error) => {
            if (error) {
                s
                throw error
            }
            response.status(201).json({ status: 'success', message: 'Marca criada.' })
        },
    )
}

const updateMarca = (request, response, next) => {
    const { codigo, nome, cnpj } = request.body
    pool.query('UPDATE marcas set nome=$1, cnpj=$2 where codigo=$3',
        [nome, cnpj, codigo], error => {
            if (error) {
                console.log(error)
                throw error
            }
            response.status(201).json({ status: 'success', message: 'Marca atualizada.' })
        })
}

const deleteMarca = (request, response, next) => {    
    const codigo = parseInt(request.params.id);
    pool.query('DELETE FROM marcas where codigo = $1', [codigo], error => {
        if (error) {
            console.log(error);
            throw error
        }
        response.status(201).json({ status: 'success', message: 'Marca apagada.' })
    })
}

const getMarcaPorID = (request, response, next) => {
    const codigo = parseInt(request.params.id);
    pool.query('SELECT * FROM marcas where codigo = $1', [codigo], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

app
    .route('/marcas')
    // GET endpoint
    .get(getMarca)
    // POST endpoint
    .post(addMarca)
    // PUT
    .put(updateMarca)  

app.route('/marcas/:id')
    .get(getMarcaPorID) 
    .delete(deleteMarca) 


// Start server
app.listen(process.env.PORT || 3003, () => {
    console.log(`Servidor rodando nas porta 3003`)
})